"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditBlogPage({ params }) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
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
          body: JSON.stringify({ title, content }),
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

  return (
    <>
      <ProtectedRoute>
        <div className="mx-10 mt-10 bg-blue-600 p-10 rounded-2xl flex flex-col">
          {loading ? (
            <h1 className="ont-bold pb-5 text-black text-3xl">Loading...</h1>
          ) : (
            <>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!edit}
                className="font-bold pb-5 text-black text-3xl"
              />
              <input
                type="text"
                name="body"
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!edit}
                className="text-white"
              />
              <p className="text-gray-300 pt-4">Author: {author}</p>
            </>
          )}
        </div>
        {isOwner ? (
          <div className="mx-10 mt-4 flex gap-4">
            <button
              onClick={edit ? handleSave : handleEdit}
              className={`text-white px-4 py-1 rounded-lg cursor-pointer ${
                edit ? "bg-amber-500" : "bg-green-600"
              }`}
            >
              {edit ? "Save" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-1 rounded-lg cursor-pointer"
            >
              Delete
            </button>
          </div>
        ) : null}
      </ProtectedRoute>
    </>
  );
}
