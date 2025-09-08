"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      await res.json();
      setTitle("");
      setContent("");
      router.push("/blogs");
    } catch (err) {
      console.error("Blog creation error:", err);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md bg-white shadow-md rounded-xl p-8"
      >
        <h2 className="text-2xl font-semibold text-center">Create Blog</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="body" className="text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="body"
            name="body"
            rows="6"
            placeholder="Enter Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
