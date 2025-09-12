import { connectDB } from "@/lib/db";
import BLOG from "@/models/blog";
import {corsResponse} from "@/lib/cors" 

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const blog = await BLOG.findById(id);
    if (!blog) {
      return corsResponse({ error: "Blog not found" });
    }
    return corsResponse(blog);
  } catch (err) {
    console.error("API Error:", err);
    return corsResponse({ error: "Failed to fetch blog" }, 500);
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { title, content } = await req.json();
    const blog = await BLOG.findByIdAndUpdate(
      id,
      {
        title,
        body: content,
      },
      { new: true }
    );

    if (!blog) {
      return corsResponse({ error: "Blog not found" }, 404);;
    }
    return corsResponse(blog);
  } catch (err) {
    return corsResponse({ error: "Failed to update blog" }, 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await BLOG.findByIdAndDelete(id);
   return corsResponse({ msg: "Blog Delete Successfully" }, 200);

  } catch (err) {
    return corsResponse({ error: "Failed to delete blog" }, 500);
  }
}
