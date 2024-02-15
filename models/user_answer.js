import mongoose, { Schema } from "mongoose";

const userAnswerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    userAnswer: String,
  },
  {
    timestamps: true,
  }
);

const UserAnswer = mongoose.models.UserAnswer || mongoose.model("UserAnswer", userAnswerSchema);

export default UserAnswer;
