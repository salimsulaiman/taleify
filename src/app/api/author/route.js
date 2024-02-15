import connectMongoDB from "../../../../libs/mongodb";
import Author from "../../../../models/author";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, password } = await request.json();

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await connectMongoDB();
  await Author.create({
    name,
    email,
    picture: `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${name}&size=256`,
    password: hashPassword,
  });
  return NextResponse.json({ message: "Author Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const author = await Author.find({});
  return NextResponse.json({ author }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Author.findByIdAndDelete(id);
  return NextResponse.json({ message: "Author deleted" }, { status: 200 });
}
