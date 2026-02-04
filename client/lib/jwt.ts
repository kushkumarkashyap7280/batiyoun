import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

export async function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days expiration
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, SECRET_KEY);
  
  // Convert to unknown first to avoid TypeScript error, then validate
  const unknownPayload = payload as unknown;
  const typedPayload = unknownPayload as any;
  
  // Validate that the payload contains our required fields
  if (!typedPayload.userId || !typedPayload.email || !typedPayload.username || typeof typedPayload.tokenVersion !== 'number') {
    throw new Error('Invalid token payload structure');
  }
  
  return {
    userId: typedPayload.userId,
    email: typedPayload.email,
    username: typedPayload.username,
    tokenVersion: typedPayload.tokenVersion,
    iat: (payload as unknown as JWTPayload).iat,
    exp: (payload as unknown as JWTPayload).exp,
  };
}

export async function refreshToken(payload: JWTPayload): Promise<string> {
  // Create a new token with the same payload but fresh expiration
  const newPayload = {
    userId: payload.userId,
    email: payload.email,
    username: payload.username,
    tokenVersion: payload.tokenVersion,
  };
  
  return await createToken(newPayload);
}

export function shouldRefreshToken(payload: JWTPayload): boolean {
  if (!payload.exp) return false;
  
  const expTime = payload.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const timeLeft = expTime - currentTime;
  
  // Refresh if less than 2 days left
  const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
  return timeLeft < TWO_DAYS;
}