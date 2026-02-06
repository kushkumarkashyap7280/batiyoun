import prisma from "@/lib/prisma";
import { routeWrapper } from "@/lib/api";
import { ApiError } from "@batiyoun/common";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { tokenPayloadSchema } from "@batiyoun/common";
import { verifyTokenSecret, generateAccessToken } from "@/utils/tokens";

export const GET = routeWrapper(async (request: Request) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken) {
    try {
      const payload = await verifyTokenSecret(accessToken, env.ACCESS_TOKEN_SECRET);
      const data = tokenPayloadSchema.parse(payload);
      
      return {
        success: true,
        message: "User verified",
        user: data,
      };
    } catch (error) {
    }
  }

  if (!refreshToken) {
    throw new ApiError("Unauthorized", 401);
  }

  try {
    const refreshPayload = await verifyTokenSecret(refreshToken, env.REFRESH_TOKEN_SECRET);
    const data = tokenPayloadSchema.parse(refreshPayload);

    const user = await prisma.user.findUnique({
      where: { id: data.id },
      select: { 
        id: true, 
        email: true, 
        username: true, 
        refreshToken: true
      } 
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError("Session invalid", 401);
    }

    const newAccessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: false,
    });

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    return {
      success: true,
      message: "Session refreshed",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: false
      },
    };

  } catch (error) {
    throw new ApiError("Session expired. Please log in again.", 401);
  }
});