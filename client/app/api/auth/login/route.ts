import prisma from "@/lib/prisma";
import { routeWrapper } from "@/lib/api";
import { z } from "zod";
import { env } from "@/config/env";
import {
  EmailSchema,
  UsernameSchema,
  PasswordSchema,
  TokenPayload,
  ApiError,
} from "@batiyoun/common";
import { generateAccessToken, generateRefreshToken } from "@/utils/tokens";
import { comparePasswords } from "@/utils/hashPassword";
import { cookies } from "next/headers";

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

export const POST = routeWrapper(async (request: Request) => {
  const { username, email, password } = LoginSchema.parse(await request.json());

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email || undefined }, { username: username || undefined }],
    },
  });

  if (!user || !user.passwordHash) {
    throw new ApiError("Invalid credentials", 401);
  }

  const isPasswordValid = await comparePasswords(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError("Invalid credentials", 401);
  }

  const tokenPayload: TokenPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    isAdmin: false,
  };

  const accessToken = await generateAccessToken(tokenPayload);
  const refreshToken = await generateRefreshToken(tokenPayload);

  // save refresh token in DB
  const isSetTokenSaved = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken: refreshToken,
    },
  });

  if (!isSetTokenSaved) {
    throw new ApiError("Failed to save refresh token", 500);
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  cookieStore.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes
    path: "/",
  });

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    },
  };
});
