"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    await signIn("credentials", { username, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Incorrect password or username",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}
export async function handleSignOut() {
  await signOut({ redirectTo: "/auth/signin" });
}
