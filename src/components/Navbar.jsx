"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-around py-6 bg-blue-600 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">BLOGI</Link>
      </div>
      {status === "authenticated" ? (
        <>
          <ul className="flex items-center gap-8">
            <li className="hover:text-black">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-black">
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className="hover:text-black">
              <Link href="/my-blogs">My Blogs</Link>
            </li>
          </ul>
          <div className="bg-white rounded-lg px-4 text-black font-semibold">
            <Link href="/blogs/new">+ Add Blog</Link>
          </div>
        </>
      ) : (
        <div className="flex gap-4 items-center justify-center">
          <div className="bg-black rounded-lg px-4 text-white font-semibold">
            <Link href="/login">Login</Link>
          </div>
          <div className="bg-white rounded-lg px-4 text-black font-semibold">
            <Link href="/signup">SignUp</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
