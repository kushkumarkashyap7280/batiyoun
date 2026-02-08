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
  fullName: z.string().nonempty({ message: "Full name is required" }).min(1, { message: "Full name cannot be empty" }),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),
  password: PasswordSchema.shape.password,
});

export type CompleteSignupUserData = z.infer<typeof completeSignupUserSchema>;


export const tokenPayloadSchema = z.object({
  id: z.string().nonempty({ message: "User ID is required" }),
  email: EmailSchema.shape.email,
  username: UsernameSchema.shape.username,
  isAdmin: z.boolean({ message: "Admin status is required" }),
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>





export const otpTypeSchema = z.enum(["SIGNUP", "RESET_PASSWORD", "FORGOT_PASSWORD"], {
  message: "OTP type must be SIGNUP, RESET_PASSWORD, or FORGOT_PASSWORD"
});


export type OtpType = z.infer<typeof otpTypeSchema>;

export const sendOtpSchema = z.object({
  email: EmailSchema.shape.email,
  type: otpTypeSchema,
});

export type SendOtpData = z.infer<typeof sendOtpSchema>;

export const verifyOtpSchema = z.object({
  email: EmailSchema.shape.email,
  otp: z.string({ message: "OTP is required" }).length(6, "OTP must be exactly 6 digits"),
  type: otpTypeSchema,
});


export type VerifyOtpData = z.infer<typeof verifyOtpSchema>;



export const ZustandUserSchema = z.object({
  id: z.string({ message: "User ID is required" }),
  username: UsernameSchema.shape.username,
  email: EmailSchema.shape.email,
  fullName: z.string({ message: "Full name is required" }),
  avatar: z.string().nullable().optional(),
  isAdmin: z.boolean({ message: "Admin status is required" }),
});

export type ZustandUser = z.infer<typeof ZustandUserSchema>;

export const LoginSchema = z
  .object({
    email: EmailSchema.shape.email.optional(),
    username: UsernameSchema.shape.username.optional(),
    password: PasswordSchema.shape.password,
  })
  .refine((data) => data.email || data.username, {
    message: "Please provide either Email or Username",
    path: ["username"],
  });

export type LoginData = z.infer<typeof LoginSchema>;
