import connectMongoDB from "../../../../libs/mongodb";
import Story from "../../../../models/story";
import Literation from "../../../../models/literation";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { literation, subTitle, story } = await request.json();

  await connectMongoDB();
  await Story.create({
    literation,
    subTitle,
    story,
  });
  return NextResponse.json({ message: "Story Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const story = await Story.find({}).populate({
    path: "literation",
    select: "_id title",
  });
  return NextResponse.json(story, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);
  await connectMongoDB();
  await Genre.findByIdAndDelete(id);
  return NextResponse.json({ message: "Genre deleted" }, { status: 200 });
}
