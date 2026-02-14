import { z } from 'zod';

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 chars')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
});

export type UsernameData = z.infer<typeof UsernameSchema>;

export const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type EmailData = z.infer<typeof EmailSchema>;


export const UserSchema = z.object({
  _id: z.string({ message: 'User ID is required' }),
  username: UsernameSchema.shape.username,
  email: EmailSchema.shape.email,
  fullName: z.string({ message: 'Full name is required' }),
  avatar: z.string().nullable().optional(),
  isAdmin: z.boolean().default(false),
  isOnline: z.boolean().default(false),
  lastSeen: z.coerce.date().default(() => new Date()),
  publicKey: z.string().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;
