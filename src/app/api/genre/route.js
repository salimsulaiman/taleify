import connectMongoDB from "../../../../libs/mongodb";
import Genre from "../../../../models/genre";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name } = await request.json();
  await connectMongoDB();
  await Genre.create({
    name,
  });
  return NextResponse.json({ message: "Genre Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const genre = await Genre.find({});
  return NextResponse.json({ genre }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);
  await connectMongoDB();
  await Genre.findByIdAndDelete(id);
  return NextResponse.json({ message: "Genre deleted" }, { status: 200 });
}
