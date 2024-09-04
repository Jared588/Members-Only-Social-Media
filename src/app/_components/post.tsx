"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import { type Session } from "next-auth";
import Image from "next/image";

interface MakePostProps {
  session: Session;
}

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export function MakePost({ session }: MakePostProps) {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="flex border-b p-4 py-10">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt="Profile image"
          layout="fixed"
          width={100}
          height={100}
          className="rounded-full"
        />
      ) : (
        <div className="h-full w-full rounded-full bg-gray-300"></div> // Placeholder for missing image
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex grow flex-col justify-between gap-2 px-4"
      >
        <textarea
          placeholder="Type something..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-full w-full overflow-y-auto bg-transparent px-4 py-2 text-slate-200 outline-none"
        />
        <button
          type="submit"
          className="bg-white/10 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export function GetPosts() {
  const [posts] = api.post.getAll.useSuspenseQuery();

  return (
    <div className="max-w-full">
      {posts ? (
        posts.map((post) => (
          <div key={post.id} className="truncate border-y border-slate-600 p-4">
            <div className="flex items-center gap-2 pb-5">
              {post.createdBy.image ? (
                <Image
                  src={post.createdBy.image}
                  alt="Profile image"
                  layout="fixed"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-gray-300"></div> // Placeholder for missing image
              )}
              <p>{post.createdBy.name}</p>
            </div>
            <p>{post.name}</p>
            <p className="text-xs text-slate-500">
              {post.createdAt.toDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
