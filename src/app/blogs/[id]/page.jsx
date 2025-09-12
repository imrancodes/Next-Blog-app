"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditBlogPage({ params }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setTitle(data.title);
        setContent(data.body);
        setAuthor(data.author);
        setUserId(data.userId);
        setImage(data.image);
      } catch (err) {
        console.error("Failed to fetch blog", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const isOwner = session?.user?.id === userId;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, image }),
        }
      );
      await res.json();
      setEdit(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.push("/blogs");
    } else {
      console.error("Delete failed");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload an image in PNG, JPG, or JPEG format.");
      return;
    }

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const uploadImageUrl = await res.json();
    setImage(uploadImageUrl.url);
  };

  return (
    <>
      <ProtectedRoute>
        <div className="mx-10 mt-10 bg-blue-600 p-10 rounded-2xl flex flex-col gap-6">
          {loading ? (
            <h1 className="text-black text-3xl font-bold">Loading...</h1>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4">
                <label className="relative group w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={!edit}
                    className="hidden"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Blog"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  {edit && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-80 text-white font-semibold rounded-lg transition cursor-pointer">
                      Change Image
                    </div>
                  )}
                </label>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!edit}
                className="font-bold text-3xl w-full"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!edit}
                className="w-full h-40 p-2 text-black rounded-lg"
              />
              <p className="text-gray-300">Author: {author}</p>
            </>
          )}

          {isOwner && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={edit ? handleSave : handleEdit}
                className={`px-4 py-2 rounded-lg text-white ${
                  edit ? "bg-amber-500" : "bg-green-600"
                }`}
              >
                {edit ? "Save" : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
}
