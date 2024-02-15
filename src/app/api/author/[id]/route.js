import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Author from "../../../../../models/author";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name, newEmail: email, newPicture: picture, newPassword: password } = await request.json();
  await connectMongoDB();
  await Author.findByIdAndUpdate(id, { name, email, picture, password });
  return NextResponse.json({ message: "Author updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const author = await Author.findOne({ _id: id });
  return NextResponse.json(author, { status: 200 });
}
