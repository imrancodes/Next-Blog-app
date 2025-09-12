"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image }),
      });
      await res.json();
      setTitle("");
      setContent("");
      router.push("/blogs");
    } catch (err) {
      console.error("Blog creation error:", err);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload an image in PNG, JPG, or JPEG format.");
        return;
      }

      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadImageUrl = await res.json();
      setImage(uploadImageUrl.url);
    } catch (err) {
      console.error("Image Upload error:", err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex justify-center my-20 px-4">
        <form
          className="flex flex-col gap-6 w-full max-w-md bg-white shadow-md rounded-xl p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center">Create Blog</h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-4 w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              rows="6"
              placeholder="Enter Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Blog
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default CreateBlog;
