import BLOG from "@/models/blog";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {corsResponse} from "@/lib/cors" 

export async function GET() {
  try {
    await connectDB();
    const blogs = await BLOG.find({});
    return corsResponse(blogs);
  } catch (error) {
    console.error("API Error:", error);
    return corsResponse({ error: "Failed to fetch blogs" }, 500);
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return corsResponse({ error: "Unauthorized" }, 401);
    }

    const { title, content, image } = await req.json();
    const result = await BLOG.create({
      title,
      body: content,
      image,
      author: session.user.name,
      userId: session.user.id,
    });
    return corsResponse(result);
  } catch (err) {
   return corsResponse({ error: "Failed to create blogs" }, 500);
  }
}
