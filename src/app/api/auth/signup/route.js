import USER from "@/models/user";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
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

    return NextResponse.json({ msg: "User created succesfully", user });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
