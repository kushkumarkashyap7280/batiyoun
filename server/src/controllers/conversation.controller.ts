import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Conversation from '../models/conversation.model';
import Message from '../models/message.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiRes';
import { ApiError } from '../utils/apiError';

// GET /api/conversations/my-conversations
const getMyConversations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const conversations = await Conversation.find({
    participants: { $in: [userId] },
    isGroup: false,
  })
    .populate({ path: 'participants', select: 'username fullName avatar isOnline lastSeen' })
    .populate({ path: 'lastMessage', select: 'content senderId createdAt' })
    .sort({ updatedAt: -1 })
    .lean();

  res.status(200).json(new ApiResponse(200, conversations, 'Conversations fetched successfully'));
});

// GET /api/conversations/:conversationId/messages?page=1&limit=20
const getConversationMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;
  const userId = req.userId!;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: { $in: [userId] },
  });

  if (!conversation) throw new ApiError(403, 'Not a participant of this conversation');

  const total = await Message.countDocuments({ conversationId });

  // Fetch newest-first then reverse → chronological order for the page
  const messages = await Message.find({ conversationId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: messages.reverse(),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      },
      'Messages fetched successfully',
    ),
  );
});

// GET /api/conversations/:conversationId
const getConversationById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;
  const userId = req.userId!;

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: { $in: [userId] },
  })
    .populate({ path: 'participants', select: 'username fullName avatar isOnline lastSeen' })
    .populate({ path: 'lastMessage', select: 'content senderId createdAt' })
    .lean();

  if (!conversation) throw new ApiError(404, 'Conversation not found');

  res.status(200).json(new ApiResponse(200, conversation, 'Conversation fetched successfully'));
});

export { getMyConversations, getConversationMessages, getConversationById };
