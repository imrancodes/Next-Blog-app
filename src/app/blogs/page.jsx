"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <ProtectedRoute>
      <div className="m-10">
        <h1 className="text-center text-4xl font-bold">All Blogs</h1>
        <div className="grid grid-cols-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-blue-600 m-10 text-white p-8 rounded-2xl cursor-pointer hover:scale-110 transition"
            >
              <Link href={`/blogs/${blog._id}`}>
                <h1 className="font-bold pb-5 text-black text-xl">
                  {blog.title}
                </h1>
                <p className="truncate">{blog.body}</p>
                <p className="text-sm pt-4 text-gray-300">By {blog.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
