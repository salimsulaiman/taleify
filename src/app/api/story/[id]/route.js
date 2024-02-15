import Story from "../../../../../models/story";
import Literation from "../../../../../models/literation";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name } = await request.json();
  await connectMongoDBDB();
  await Literation.findByIdAndUpdate(id, { name });
  return NextResponse.json({ message: "Genre updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const story = await Story.findOne({ _id: id }).populate({
    path: "literation",
    select: "_id title",
  });
  return NextResponse.json(story, { status: 200 });
}
