import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import UserAnswer from "../../../../../models/user_answer";
import User from "../../../../../models/user";
import Question from "../../../../../models/question";
import Story from "../../../../../models/story";

export async function POST(request) {
  const { user, question, userAnswer } = await request.json();

  await connectMongoDB();
  await UserAnswer.create({
    user,
    question,
    userAnswer,
  });
  return NextResponse.json({ message: "Answer Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const userAnswer = await UserAnswer.find({})
    .populate({
      path: "user",
      select: "_id name email",
    })
    .populate({
      path: "question",
      select: "_id story question answer correct_answer",
      populate: {
        path: "story",
        select: "_id literation story",
      },
    });
  return NextResponse.json(userAnswer, { status: 200 });
}
