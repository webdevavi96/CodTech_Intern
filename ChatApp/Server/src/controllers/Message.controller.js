import { asyncHandler } from '../utils/asyncHandler.js';
import { Messages } from '../models/Messages.models.js';
import { User } from '../models/User.models.js';
import { client } from '../config/redis.conf.js';
import mongoose from 'mongoose';

// This methoe is unuesd for now.
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
  const { page, limit, sortBy, sortType } = req.query;
  const receiverId = req.params.userId;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;
  const sortOrder = -1;
  const allowedSortFields = ['createdAt', 'updatedAt', 'sentBy', 'sentTo'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

  if (!mongoose.Types.ObjectId.isValid(receiverId))
    return res.status(400).json({ message: 'reciever id is required!' });

  const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
  const senderObjectId = new mongoose.Types.ObjectId(req.user._id);
  const users = [receiverId, req.user._id].sort();
  const baseKey = `chat:${users[0]}:${users[1]}`;
  const cacheKey = `chat:${users[0]}:${users[1]}:page:${pageNum}:limit:${limitNum}:sort:${sortType}`;
  let messages = null;
  let total = 0;

  const cache = await client.get(cacheKey);

  if (cache) {
    console.log('here');
    const parsed = JSON.parse(cache);
    messages = parsed.messages;
    total = parsed.total;
  } else {
    const query = {
      $or: [
        { sentBy: senderObjectId, sentTo: receiverObjectId },
        { sentBy: receiverObjectId, sentTo: senderObjectId },
      ],
    };

    messages = await Messages.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limitNum);

    total = await Messages.countDocuments(query);

    await client.set(cacheKey, JSON.stringify({ messages, total }));
  }

  if (messages.length === 0)
    return res.status(200).json({ data: [], success: true, hasMore: false });

  const keys = await client.keys(`${baseKey}:*`);
  if (keys.length) {
    await client.del(keys);
  }

  return res.status(200).json({
    success: true,
    data: messages,
    hasMore: skip + limitNum < total,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, sortBy, sortType } = req.query;
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const allowedSortFields = ['createdAt', 'username', 'fullname'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

  const sortOrder = sortType === 'asc' ? 1 : -1;

  const userId = new mongoose.Types.ObjectId(req.user._id);

  const users = await User.aggregate([
    { $match: { _id: { $ne: userId } } },
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
