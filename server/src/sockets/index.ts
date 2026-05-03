import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import User from '../models/user.model';
import Conversation from '../models/conversation.model';
import { handleUserConnection } from './handlers/user.handler';

export const initializeSocket = (io: Server) => {
  // ── Auth middleware ──────────────────────────────────────────────────────────
  io.use((socket, next) => {
    try {
      let token = socket.handshake.auth?.token;
      if (!token) {
        const rawCookies = socket.request.headers.cookie || '';
        const parsedCookies = cookie.parse(rawCookies);
        token = parsedCookies['access_token'];
      }
      if (!token) return next(new Error('Authentication error'));

      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as any;
      socket.data.user = decoded;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  // ── Connection ───────────────────────────────────────────────────────────────
  io.on('connection', async (socket) => {
    const user = socket.data.user;
    console.log(`🟢 ${user.username} connected (${socket.id})`);

    // Join personal room (for direct DMs)
    socket.join(user.id);

    // Mark online
    await User.findByIdAndUpdate(user.id, { isOnline: true });

    // Join all conversation rooms & collect who to notify
    const conversations = await Conversation.find({ participants: { $in: [user.id] } });
    const participantIds = new Set<string>();

    conversations.forEach((conv) => {
      socket.join(conv._id.toString());
      conv.participants.forEach((p: any) => {
        const pid = p.toString();
        if (pid !== user.id) participantIds.add(pid);
      });
    });

    // Broadcast online globally
    io.emit('user:online', { userId: user.id });

    // Wire up message/conversation events
    handleUserConnection(io, socket);

    // ── Disconnect ─────────────────────────────────────────────────────────────
    socket.on('disconnect', async () => {
      console.log(`🔴 ${user.username} disconnected`);
      const lastSeen = new Date();
      await User.findByIdAndUpdate(user.id, { isOnline: false, lastSeen });

      io.emit('user:offline', { userId: user.id, lastSeen });
    });
  });
};
