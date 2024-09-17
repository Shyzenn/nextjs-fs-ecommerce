// "use client";

// import { signOut, useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

// const AdminNavbar = () => {
//   const { data: session, status }: any = useSession();

//   return (
//     <div className="flex items-center justify-between shadow-md p-4">
//       <div>
//         <h1 className="text-2xl">User</h1>
//       </div>
//       {session?.user?.role === "admin" ? (
//         <div className="flex items-center gap-4">
//           <button onClick={() => signOut()}>Sign out</button>
//           <p>Profile</p>
//         </div>
//       ) : (
//         redirect("/user")
//       )}
//     </div>
//   );
// };

// export default AdminNavbar;
