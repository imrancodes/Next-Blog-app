"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-blue-600 text-white shadow-md">
      <div className="text-2xl font-bold hover:text-gray-200 transition">
        <Link href="/">BLOGI</Link>
      </div>

      {status === "authenticated" ? (
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li className="hover:text-gray-200 transition">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-gray-200 transition">
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className="hover:text-gray-200 transition">
              <Link href="/my-blogs">My Blogs</Link>
            </li>
          </ul>
          <Link
            href="/blogs/new"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            + Add Blog
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
