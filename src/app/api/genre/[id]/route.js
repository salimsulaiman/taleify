import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Genre from "../../../../../models/genre";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name } = await request.json();
  await connectMongoDB();
  await Genre.findByIdAndUpdate(id, { name });
  return NextResponse.json({ message: "Genre updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const genre = await Genre.findOne({ _id: id });
  return NextResponse.json(genre, { status: 200 });
}
