import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    question: String,
    answer: Array,
    correct_answer: String,
    point: Number,
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
