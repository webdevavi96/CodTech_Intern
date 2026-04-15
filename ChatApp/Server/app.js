import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';

import { Messages } from './src/models/Messages.models.js';

import userRouter from './src/routes/auth.routes.js';
import chatRouter from './src/routes/chat.routes.js';

const app = express();

const port = process.env.APP_PORT;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN, process.env.TEST_ORIGIN, process.env.TEST_ORIGIN2],
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.TEST_ORIGIN, process.env.TEST_ORIGIN2],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', userRouter);
app.use('/api/chat', chatRouter);
// app.set('io', io);

const activeUsers = new Map();

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.userId = userId;

    if (!activeUsers.has(userId)) activeUsers.set(userId, new Set());

    activeUsers.get(userId).add(socket.id);

    socket.join(userId);

    if (activeUsers.get(userId).size === 1) {
      socket.to(userId).emit('status', {
        userId,
        status: 'Online',
      });
    }
  });

  socket.on('check_status', (userId, callback) => {
    const isOnline = activeUsers.has(userId);

    callback({
      userId,
      status: isOnline ? 'Online' : 'Offline',
    });
  });

  socket.on('send_message', async ({ senderId, receiverId, text }) => {
    const message = await Messages.create({
      sentBy: senderId,
      sentTo: receiverId,
      content: text,
    });

    io.to(receiverId).emit('receive_message', message);
    io.to(senderId).emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected!: ', socket.id);
    const userId = socket.userId;
    if (!userId || !activeUsers.has(userId)) return;

    const activeSockets = activeUsers.get(userId);
    activeSockets.delete(socket.id);

    if (activeSockets.size === 0) {
      activeUsers.delete(userId);

      socket.broadcast.emit('status', {
        userId,
        status: 'Offline',
      });
    }
  });
});

app.get('/', (req, res) => {
  res.send('hello');
});

export { app, server, port };
