import connectMongoDB from "../../../../libs/mongodb";
import Story from "../../../../models/story";
import Question from "../../../../models/question";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { story, question, answer, correct_answer, point } = await request.json();

  await connectMongoDB();
  await Question.create({
    story,
    question,
    answer,
    correct_answer,
    point,
  });
  return NextResponse.json({ message: "Question Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const question = await Question.find({}).populate({
    path: "story",
    select: "_id literation subTitle",
  });
  return NextResponse.json(question, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);
  await connectMongoDB();
  await Genre.findByIdAndDelete(id);
  return NextResponse.json({ message: "Genre deleted" }, { status: 200 });
}
