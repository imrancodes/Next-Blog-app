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
        const res = await fetch(`api/posts`, { cache: "no-store" });
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
        <h1 className="text-center text-4xl font-bold mb-8">All Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog._id}`}
              className="bg-blue-600 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transform transition shadow-lg"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-100 truncate">{blog.body}</p>
              <p className="text-sm pt-2 text-gray-300">By {blog.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
