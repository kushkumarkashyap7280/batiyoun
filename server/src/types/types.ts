import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  password: z.string().optional(),
  googleId: z.string().optional(),
  avatar: z.string().nullable(),
  isOnline: z.boolean().default(false),
  lastSeen: z.date().default(new Date()),
  publicKey: z.string().nullable(),
});

export type BUser = z.infer<typeof UserSchema>;

export const ConversationSchema = z.object({
  participants: z.array(z.string()),
  lastMessage: z.string().optional(),
  isGroup: z.boolean().default(false),
  groupName: z.string().optional(),
  groupAvatar: z.string().optional(),
  groupDescription: z.string().optional(),
  groupAdmins: z.array(z.string()).optional(),
});

export type BConversation = z.infer<typeof ConversationSchema>;

export const MessageSchema = z.object({
  conversationId: z.string(),
  senderId: z.string(),
  content: z.string(),
});

export type BMessage = z.infer<typeof MessageSchema>;
