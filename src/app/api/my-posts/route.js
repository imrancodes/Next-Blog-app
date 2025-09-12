import { connectDB } from "@/lib/db";
import BLOG from "@/models/blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {corsResponse} from "@/lib/cors" 

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return corsResponse({ error: "Not authenticated" }, 401);
    }
    await connectDB();
    const result = await BLOG.find({ userId: session?.user?.id });
    return corsResponse(JSON.stringify(result), 200);
  } catch (err) {
   return corsResponse({ error: "Something went wrong" }, 500);
  }
}
