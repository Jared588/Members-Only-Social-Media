import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="h-15 flex w-full justify-between border-b-2 border-slate-400">
      <h1 className="p-5 text-3xl text-zinc-200">T3-Messaging!</h1>
      <div className="content-center p-5 text-xl text-zinc-200">
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </header>
  );
}
