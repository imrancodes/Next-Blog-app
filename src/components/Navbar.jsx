import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around py-6 bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">BLOGI</h1>
      <ul className="flex items-center gap-8">
        <li className="hover:text-black">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-black">
          <Link href="/blogs">Blogs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
