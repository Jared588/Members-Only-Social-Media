import Link from "next/link";
import Header from "./_components/header";

import { MakePost, GetPosts } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gray-950">
        <Header />
        <div className="flex w-full grow flex-col border-x text-slate-200 md:max-w-4xl">
          <div>
            {session ? (
              <>
                <MakePost session={session}/>
                <GetPosts />
              </>
            ) : (
              <>
                <p className="flex justify-center">Please log in to write something</p>
                <br />
                <GetPosts />
              </>
            )}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
