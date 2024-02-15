import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, password } = await request.json();

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await connectMongoDB();
  await User.create({
    name,
    email,
    picture: `https://api.dicebear.com/7.x/initials/svg?seed=${name}&size=256`,
    password: hashPassword,
  });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const user = await User.find({});
  return NextResponse.json({ user }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
