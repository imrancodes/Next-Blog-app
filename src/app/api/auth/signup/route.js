import USER from "@/models/user";
import { connectDB } from "@/lib/db";
import {corsResponse} from "@/lib/cors" 
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await USER.create({
      name,
      email,
      password: hashPassword,
    });

    return corsResponse(user);
  } catch (err) {
    console.error("API Error:", err);
    return corsResponse({ error: "Failed to create user" }, 500);
  }
}
