"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-posts`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setMyBlogs(data);
        } else {
          setMyBlogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch my blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  return (
    <ProtectedRoute>
      <div className="m-10">
        <h1 className="text-center text-4xl font-bold mb-8">My Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myBlogs.map((blog) => (
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
};

export default MyBlogs;
