"use client";

import { signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={() => signIn("discord", { callbackUrl: "/" })}
          className="flex mb-2 rounded bg-blue-500 p-4 text-white items-center"
        >
          <Image
            className="mr-2"
            src="https://img.icons8.com/?size=100&id=30888&format=png&color=000000"
            alt="Discord logo"
            width={32}
            height={32}
          />
          Sign in with Discord
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="rounded bg-gray-800 p-4 text-white"
        >
          <GitHubIcon fontSize="large" className="mr-2" />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
