import { NextResponse } from "next/server";
import { env } from "@/config/env";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/utils/tokens";
import { TokenPayload, ApiError, UsernameSchema } from "@batiyoun/common";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  const originUrl = url.origin;

  if (error) {
    return NextResponse.redirect(
      `${originUrl}/login?error=${error}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${originUrl}/login?error=no_code`
    );
  }

  try {
    const cookieStore = await cookies();
    const codeVerifier = cookieStore.get("pkce_verifier")?.value;

    if (!codeVerifier) {
      throw new ApiError("PKCE verifier not found", 400);
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Token exchange failed:", errorData);
      throw new ApiError("Failed to exchange code for token", 400);
    }

    const tokens: GoogleTokenResponse = await tokenResponse.json();

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new ApiError("Failed to fetch user info", 400);
    }

    const googleUser: GoogleUserInfo = await userInfoResponse.json();

    let user = await prisma.user.findUnique({
      where: { googleId: googleUser.id },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleUser.id,
            avatar: googleUser.picture,
          },
        });
      } else {
        const emailPrefix = googleUser.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
        const timestamp = Date.now().toString(36);
        const username = (emailPrefix || "user") + "_" + timestamp;
        
        user = await prisma.user.create({
          data: {
            googleId: googleUser.id,
            email: googleUser.email,
            username: username,
            fullName: googleUser.name,
            avatar: googleUser.picture,
            isVerified: googleUser.verified_email,
          },
        });
      }
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          avatar: googleUser.picture,
        },
      });
    }

    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const accessToken = await generateAccessToken(tokenPayload);
    const refreshToken = await generateRefreshToken(tokenPayload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken },
    });

    cookieStore.delete("pkce_verifier");

    cookieStore.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    cookieStore.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    return NextResponse.redirect(
      `${originUrl}/${user.username}`
    );
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      `${originUrl}/login?error=oauth_failed`
    );
  }
}