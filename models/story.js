import mongoose, { Schema } from "mongoose";

const storySchema = new mongoose.Schema(
  {
    literation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Literation",
    },
    subTitle: String,
    story: String,
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.models.Story || mongoose.model("Story", storySchema);

export default Story;
