import { z } from "zod";

// 1. Define the Schema (The Rules)
export const MessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  senderId: z.string(),
  room: z.string(),
  createdAt: z.string().optional()
});

// 2. Export the Type (So TypeScript knows what 'Message' is)
export type MessageType = z.infer<typeof MessageSchema>;