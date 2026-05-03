import mongoose from 'mongoose';
import { BConversation } from '../types/types';

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, required: false },
    groupAvatar: { type: String, required: false },
    groupDescription: { type: String, required: false },
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<BConversation>('Conversation', conversationSchema);
