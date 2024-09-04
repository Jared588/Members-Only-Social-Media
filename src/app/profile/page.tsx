import Header from "../_components/header";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Image from "next/image";
import { GetPosts } from "../_components/post";

export default async function Profile() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gray-950">
        <Header session={session} />
        <div className="flex w-full grow flex-col text-slate-200 bg-gray-900">
          <div className="flex flex-col items-center h-full p-10 gap-10">
            {session?.user.image ? (
              <>
                <Image
                  src={session.user.image}
                  alt="Profile image"
                  layout="fixed"
                  width={180}
                  height={180}
                  className="rounded-full"
                />
                <h1 className="text-6xl text-slate-300 text-center">{session.user.name}</h1>
                <GetPosts/>
              </>
            ) : (
              <>
                <p>You must log in to view your profile</p>
              </>
            )}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
