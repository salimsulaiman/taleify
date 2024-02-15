import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Literation from "../../../../../models/literation";
import Author from "../../../../../models/author";
import Genre from "../../../../../models/genre";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name } = await request.json();
  await connectMongoDB();
  await Literation.findByIdAndUpdate(id, { name });
  return NextResponse.json({ message: "Genre updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const literation = await Literation.findOne({ _id: id }).populate("author").populate("genre");
  return NextResponse.json(literation, { status: 200 });
}
