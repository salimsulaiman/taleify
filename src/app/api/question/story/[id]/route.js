import { NextResponse } from "next/server";
import Question from "../../../../../../models/question";
import Story from "../../../../../../models/story";
import Literation from "../../../../../../models/literation";
import connectMongoDB from "../../../../../../libs/mongodb";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const question = await Question.find({ story: id }).populate({
    path: "story",
    select: "_id literation subTitle",
    populate: {
      path: "literation",
      model: Literation,
      select: "_id title",
    },
  });
  return NextResponse.json(question, { status: 200 });
}
