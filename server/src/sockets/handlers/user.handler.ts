import { Server, Socket } from 'socket.io';
import Conversation from '../../models/conversation.model';
import Message from '../../models/message.model';
import { socketHandler } from '../../utils/socketHandler';

export const handleUserConnection = (io: Server, socket: Socket) => {
  // Join a specific conversation room
  socket.on(
    'conversation:join',
    socketHandler(async ({ conversationId }) => {
      socket.join(conversationId);
    }, socket),
  );

  // Leave a conversation room
  socket.on(
    'conversation:leave',
    socketHandler(async ({ conversationId }) => {
      socket.leave(conversationId);
    }, socket),
  );

  // Send a message (creates conversation if first message)
  socket.on(
    'message:send',
    socketHandler(async ({ senderId, receiverId, content, conversationId: existingId }) => {
      // Find or create conversation
      let conversation = existingId
        ? await Conversation.findById(existingId)
        : await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

      if (!conversation) {
        conversation = await Conversation.create({ participants: [senderId, receiverId] });
      }

      const message = await Message.create({
        conversationId: conversation._id.toString(),
        senderId: senderId.toString(),
        content,
      });

      conversation.lastMessage = message._id.toString();
      await conversation.save();

      // Join both to the conversation room
      socket.join(conversation._id.toString());

      const msgPayload = {
        _id: message._id,
        conversationId: conversation._id,
        senderId,
        content,
        createdAt: (message as any).createdAt,
      };

      const convUpdatePayload = {
        conversationId: conversation._id,
        lastMessage: {
          _id: message._id,
          content,
          senderId,
          createdAt: (message as any).createdAt,
        },
      };

      // Notify receiver
      io.to(receiverId.toString()).emit('message:received', msgPayload);
      io.to(receiverId.toString()).emit('conversation:updated', convUpdatePayload);

      // Confirm to sender
      socket.emit('message:sent', msgPayload);
      socket.emit('conversation:updated', convUpdatePayload);
    }, socket),
  );
};
