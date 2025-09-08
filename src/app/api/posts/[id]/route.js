import { connectDB } from "@/lib/db";
import BLOG from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const blog = await BLOG.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" });
    }
    return NextResponse.json(blog);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ msg: "Blog Update Successfully", blog });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await BLOG.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Delete Successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
