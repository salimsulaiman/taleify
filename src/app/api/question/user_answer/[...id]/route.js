import { NextResponse } from "next/server";
import UserAnswer from "../../../../../../models/user_answer";
import Question from "../../../../../../models/question";
import User from "../../../../../../models/user";
import Story from "../../../../../../models/story";
import connectMongoDB from "../../../../../../libs/mongodb";

export async function GET(request, { params }) {
  const { id } = params;

  const [userId, questionId] = id;

  await connectMongoDB();
  const userAnswer = await UserAnswer.findOne({
    user: userId,
    question: questionId,
  })
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

  if (!userAnswer) {
    return NextResponse.json({ message: "data not found" }, { status: 404 });
  }

  return NextResponse.json(userAnswer, { status: 200 });
}
