import axios from "axios";
import Link from "next/link";

export default async function BlogPage() {
  const res = await axios("https://jsonplaceholder.typicode.com/posts")
  const data = res.data;

  return (
    <div className="m-10">
      <h1 className="text-center text-4xl font-bold">All Blogs</h1>
      <div className="grid grid-cols-4">
      {data.map((blog) => (
        <div key={blog.id} className="bg-blue-600 m-10 text-white p-8 rounded-2xl cursor-pointer hover:scale-110 transition">
          <Link href={`/blogs/${blog.id}`}>
          <h1 className="font-bold pb-5 text-black text-xl">{blog.title}</h1>
          <p className="truncate">{blog.body}</p>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
}
