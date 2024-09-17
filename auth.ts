import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "auth/signin",
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid email or password.");
        }

        const user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && typeof credentials.password === "string") {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return {
              id: user.id.toString(),
              username: user.username,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const role = auth?.user.role || "USER";

      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (pathname.startsWith("/admin") && role !== "ADMIN") {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (pathname.startsWith("/register") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return (
        isLoggedIn ||
        pathname.startsWith("/auth/signin") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/admin")
      );
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
