import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createAt: {
    type: Date,
    default: Date.now,
  },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", postSchema);

export default Thread;
