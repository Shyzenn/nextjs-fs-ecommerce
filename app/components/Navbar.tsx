// import { auth } from "@/auth";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import { handleSignOut } from "@/app/actions/authActions";

// const Navbar = async () => {
//   const session = await auth();
//   console.log({ session });

//   return (
//     <div className="flex items-center justify-between shadow-md p-4">
//       <div>
//         <h1 className="text-2xl">E-commerce</h1>
//       </div>
//       <div className="flex items-center gap-5">
//         {session?.user.role === "admin" && (
//           <h1>
//             <Link href={"/admin"}>Admin</Link>
//           </h1>
//         )}
//         {!session ? (
//           <Link href="/auth/signin">
//             <Button variant="default">Sign In</Button>
//           </Link>
//         ) : (
//           <form action={handleSignOut}>
//             <Button variant="default">Sign Out</Button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
