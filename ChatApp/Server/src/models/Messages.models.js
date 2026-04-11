import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    sentOn: {
      type: Date,
      default: Date,
    },
  },
  { timestamps: true }
);

export const Messages = mongoose.model('Messages', messageSchema);
