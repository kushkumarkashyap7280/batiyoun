import { NextResponse } from "next/server";
import { env } from "@/config/env";
import { cookies } from "next/headers";
import crypto from "crypto";

function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

function generateCodeChallenge(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

export async function GET() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const cookieStore = await cookies();
  cookieStore.set("pkce_verifier", codeVerifier, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60,
    path: "/",
  });

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: env.GOOGLE_REDIRECT_URI,
    client_id: env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  };

  const qs = new URLSearchParams(options).toString();

  return NextResponse.redirect(`${rootUrl}?${qs}`);
}