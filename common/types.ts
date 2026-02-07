import { z } from "zod";


export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 chars")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
});

export const EmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type EmailData = z.infer<typeof EmailSchema>;


export type UsernameData = z.infer<typeof UsernameSchema>;

export const PasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 chars")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&]/, "Must contain a special character"),  
});
export type PasswordData = z.infer<typeof PasswordSchema>;

export const completeSignupUserSchema = z.object({
  username: UsernameSchema.shape.username,
  fullName: z.string().min(1, "Full name cannot be empty"),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),
  password: PasswordSchema.shape.password,
});

export type CompleteSignupUserData = z.infer<typeof completeSignupUserSchema>;


export const tokenPayloadSchema = z.object({
  id: z.string(),
  email: EmailSchema.shape.email,
  username: UsernameSchema.shape.username,
  isAdmin: z.boolean(),
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>





export const otpTypeSchema = z.enum(["SIGNUP", "RESET_PASSWORD", "FORGOT_PASSWORD"]);


export type OtpType = z.infer<typeof otpTypeSchema>;

export const sendOtpSchema = z.object({
  email: EmailSchema.shape.email,
  type: otpTypeSchema, // Must be one of the enum values
});

export type SendOtpData = z.infer<typeof sendOtpSchema>;

export const verifyOtpSchema = z.object({
  email: EmailSchema.shape.email,
  otp: z.string().length(6, "OTP must be 6 digits"),
  type: otpTypeSchema,
});


export type VerifyOtpData = z.infer<typeof verifyOtpSchema>;



export const ZustandUserSchema = z.object({
  id: z.string(),
  username: UsernameSchema.shape.username,
  email: EmailSchema.shape.email,
  fullName: z.string(),
  avatar: z.string().optional(),
  isAdmin: z.boolean(),
});

export type ZustandUser = z.infer<typeof ZustandUserSchema>;
