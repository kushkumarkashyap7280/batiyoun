import * as jose from 'jose'
import { ApiError, otpTypeSchema, type TokenPayload ,tokenPayloadSchema } from '@batiyoun/common'
import { env } from '@/config/env';

import{z} from 'zod'


export const generateAccessToken = async (user: TokenPayload) => {
  const payload = tokenPayloadSchema.parse({
    id: user.id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
  })
  const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m') 
    .sign(secret)
}

export const generateRefreshToken = async (user: TokenPayload) => {
  const payload = tokenPayloadSchema.parse({
    id: user.id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
  })
  const secret = new TextEncoder().encode(env.REFRESH_TOKEN_SECRET)
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}   


export const verifyToken = z.object({
  email: z.string(),
  type: otpTypeSchema
});

export type VerifyTokenData = z.infer<typeof verifyToken>;


export const generateVerifyToken = async ({email,type}: VerifyTokenData) => {
  const payload = verifyToken.parse({
    email : email,
    type: type,
  })
  const secret = new TextEncoder().encode(env.VERIFY_TOKEN_SECRET)
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m') 
    .sign(secret)
}

export const verifyTokenSecret = async (token : string , secretKey: string) => {
  try {
    const secret = new TextEncoder().encode(secretKey)
    const { payload } = await jose.jwtVerify(token, secret)
    return tokenPayloadSchema.parse(payload)
  } catch (error) {
    throw new ApiError("Invalid or expired token", 401) 
  }
}

export const verifyVerifyToken = async (token: string ) => {
  try {
    const secret = new TextEncoder().encode(env.VERIFY_TOKEN_SECRET)
    const { payload } = await jose.jwtVerify(token, secret)
    return verifyToken.parse(payload)
  } catch (error) {
    throw new ApiError("Invalid or expired token", 401) 
  }
}