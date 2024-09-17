import avatarPlaceholder from "@/app/assets/images/avatar_placeholder.png";
import { Lock, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleSignOut } from "@/app/authActions";

export default function ProfileDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="flex-none rounded-full border-2 border-blue-400 outline-none"
        >
          <Image
            src={avatarPlaceholder}
            alt="User profile picture"
            width={40}
            height={40}
            className="aspect-square rounded-full bg-background object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{"User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {/* TODO: Show this only for admins */}
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Lock className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* server side */}
          {/* <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4" type="submit" /> Sign Out
            </button>
          </form> */}
          <form action={handleSignOut}>
            <button className="flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4" type="submit" /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
