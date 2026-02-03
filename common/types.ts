import { z } from "zod";

export const MessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  senderId: z.string(),
  room: z.string(),
  createdAt: z.string().optional()
});

export type MessageType = z.infer<typeof MessageSchema>;