import BLOG from "@/models/blog";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectDB();
    const blogs = await BLOG.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, image } = await req.json();
    const result = await BLOG.create({
      title,
      body: content,
      image,
      author: session.user.name,
      userId: session.user.id,
    });
    return NextResponse.json({ msg: "success", blog: result });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
