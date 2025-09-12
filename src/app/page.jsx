"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
      <h1 className="text-center text-4xl md:text-5xl font-bold">Welcome to BLOGI</h1>

      {status === "authenticated" ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg md:text-xl">
            Welcome back, {session.user.name}! 🎉 Share your thoughts with the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blogs/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              ✍️ Create Blog
            </Link>
            <Link
              href="/blogs"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              📖 View Blogs
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg md:text-xl">
            Join our community of writers and readers. Sign up to get started or log in if you already have an account.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              📝 Sign Up
            </Link>
            <Link
              href="/login"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              🔑 Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
