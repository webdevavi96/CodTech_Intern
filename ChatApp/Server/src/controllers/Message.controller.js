import { asyncHandler } from '../utils/asyncHandler';
import { Messages } from '../models/Messages.models.js';
import { User } from '../models/User.models.js';

export const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { reciverId, text } = req.body;

    const message = await Messages.create({
      sentBy: req.user._id,
      sentTo: reciverId,
      content: text,
    });

    const receiverRoom = reciverId.toString();
    const senderRoom = req.user._id.toString();

    io.to(receiverRoom).emit('new_message', message);
    io.to(senderRoom).emit('new_message', message);

    return res.status(200).json({
      message: 'sent',
      success: true,
      data: message,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

export const getChat = asyncHandler(async (req, res) => {
  const receiverId = req.params.userId;
  const sender = req.user._id;

  const messages = await Messages.find({
    $or: [
      { sentBy: sender, sentTo: receiverId },
      { sentBy: receiverId, sentTo: sender },
    ],
  }).sort({ createdAt: 1 });

  if (!messages) return res.status(404).json({ success: false });

  return res.status(200).json({
    success: true,
    data: messages,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, sortBy, sortType } = req.query;
  console.log(req);
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const allowedSortFields = ['createdAt', 'username', 'fullname'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

  const sortOrder = sortType === 'asc' ? 1 : -1;

  const users = await User.aggregate([
    { $sort: { [sortField]: sortOrder } },
    { $skip: skip },
    { $limit: limitNum },
    { $project: { createdAt: 1, username: 1, fullname: 1, avatar: 1 } },
  ]);

  return res.status(200).json({
    success: true,
    data: users,
  });
});
