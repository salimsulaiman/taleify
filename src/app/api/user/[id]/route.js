import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name, newEmail: email, newPicture: picture, newPassword: password } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { name, email, picture, password });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json(user, { status: 200 });
}
