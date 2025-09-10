import { connectDB } from "@/lib/db";
import BLOG from "@/models/blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }
    await connectDB();
    const result = await BLOG.find({ userId: session?.user?.id });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
