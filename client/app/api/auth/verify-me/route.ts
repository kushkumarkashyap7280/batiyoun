import prisma from "@/lib/prisma";
import { routeWrapper } from "@/lib/api";
import { ApiError, ZustandUserSchema } from "@batiyoun/common";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { tokenPayloadSchema } from "@batiyoun/common";
import { verifyTokenSecret, generateAccessToken, generateRefreshToken } from "@/utils/tokens";


// steps 
// 1. Check access token - if valid, return user
// 2. If access token invalid, check refresh token 
// 3. check if user from db have same refresh token, if not, reject delete all tokens and ask to login again
// 4. If refresh token valid, generate new access token and refresh token, update db and cookies, return user

export const GET = routeWrapper(async (request: Request) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken) {
    try {
      const payload = await verifyTokenSecret(accessToken, env.ACCESS_TOKEN_SECRET);
      const data = tokenPayloadSchema.parse(payload);
      
      // Fetch full user data from database
      const user = await prisma.user.findUnique({
        where: { id: data.id },
        select: { 
          id: true, 
          email: true, 
          username: true, 
          fullName: true,
          avatar: true,
          isAdmin: true,
        } 
      });

      if (!user) {
        throw new ApiError("User not found", 404);
      }
      
      return {
        success: true,
        message: "User verified",
        user: ZustandUserSchema.parse(user),
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
        fullName: true,
        avatar: true,
        isAdmin: true,
        refreshToken: true
      } 
    });

    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      cookieStore.delete("refresh_token");
      cookieStore.delete("access_token");

      if(user){
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: null },
        });
      }
      throw new ApiError("Session invalid", 401);
    }

    const newRefreshToken = await generateRefreshToken({
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    const newAccessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    });


    cookieStore.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,  // 7 days
    });

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,  // 1 hour
    });

    return {
      success: true,
      message: "Session refreshed",
      user: ZustandUserSchema.parse(user),
    };

  } catch (error) {
    cookieStore.delete("refresh_token");
      cookieStore.delete("access_token");
    throw new ApiError("Session expired. Please log in again.", 401);
  }
});