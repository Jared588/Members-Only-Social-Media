import Header from "./_components/header";

import { MakePost, GetPosts } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { BackgroundBeams } from "./_components/ui/background-beams";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <BackgroundBeams />
      <main className="flex min-h-screen flex-col items-center bg-gray-950">
        <Header session={session} />
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
