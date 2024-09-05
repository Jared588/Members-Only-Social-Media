import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { type Session } from "next-auth";
import Image from "next/image";
import { Roboto } from "next/font/google";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

interface HeaderProps {
  session: Session | null;
}

export default async function Header({ session }: HeaderProps) {
  return (
    <header className="h-15 flex w-full justify-between border-b-2 border-slate-400">
      <Link
        href="/"
        className={`p-5 text-3xl text-zinc-200 ${roboto.className}`}
      >
        T3-Messaging!
      </Link>
      <div className="flex content-center items-center p-5 text-xl text-zinc-200">
        {session?.user.image ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={session.user.image}
                alt="Profile image"
                layout="fixed"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="mr-5">
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/api/auth/signout" className="mr-5">
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        {!session && (
          <Link href="/api/auth/signin" className={`${roboto.className}`}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
