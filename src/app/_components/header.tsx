import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { type Session } from "next-auth";
import Image from "next/image";

interface HeaderProps {
  session: Session | null;
}

export default async function Header({ session }: HeaderProps) {
  return (
    <header className="h-15 flex w-full justify-between border-b-2 border-slate-400">
      <h1 className="p-5 text-3xl text-zinc-200">T3-Messaging!</h1>
      <div className="flex content-center items-center p-5 text-xl text-zinc-200">
        {session?.user.image ? (
          <Link href={"/profile"} className="mr-5">
            <Image
              src={session.user.image}
              alt="Profile image"
              layout="fixed"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        ) : null}
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </header>
  );
}
