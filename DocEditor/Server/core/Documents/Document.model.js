import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Untitled" },
    content: { type: Object, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          default: "viewer",
        },
      },
    ],
    lastEdited: { type: Date, default: Date.now() },
  },
  { timestamps: true },
);

export const Document = mongoose.model("Document", documentSchema);
