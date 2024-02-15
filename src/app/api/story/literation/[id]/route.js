import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import Literation from "../../../../../../models/literation";
import Story from "../../../../../../models/story";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const story = await Story.find({ literation: id }).populate({
    path: "literation",
    select: "_id title",
  });
  return NextResponse.json(story, { status: 200 });
}
