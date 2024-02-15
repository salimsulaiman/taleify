import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // check Password
    const validPwd = await bcrypt.compare(password, user.password);

    if (!validPwd) {
      return NextResponse.json({ message: "incorrect password" }, { status: 401 });
    }

    // create token
    const token = jwt.sign(
      {
        _id: user._id,
        iss: "taleify",
        aud: "frontend",
        exp: parseInt(new Date().getTime() / 1000 + 12 * 60 * 60),
      },
      process.env.SECRET_KEY
    );

    return new Response(JSON.stringify({ id: user._id, token: token }), {
      status: 200,
      headers: { "Content-Type": "application/json", authuser: token },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
