import mongoose from 'mongoose';

const callSchema = new mongoose.Schema(
  {
    callFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    callTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    callAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Calls = mongoose.model('Calls', callSchema);
