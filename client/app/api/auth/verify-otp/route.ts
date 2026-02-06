import { routeWrapper } from "@/lib/api";
import {  verifyOtp } from "@/lib/redis";
import { verifyOtpSchema, VerifyOtpData} from "@batiyoun/common";
import { ApiError } from "@batiyoun/common";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { generateVerifyToken } from "@/utils/tokens";


export const POST = routeWrapper(async (request: Request) => {
    const {email, otp, type} = verifyOtpSchema.parse(await request.json()) as VerifyOtpData

    const isOtpValid = await verifyOtp(email, otp);
   
        if (!isOtpValid) {
            throw new ApiError("Invalid OTP code.", 400);
        }

    
    const token = await generateVerifyToken({email, type});
    const cookieStore = await cookies();

    cookieStore.set({
      name: "verify_token",
      value: token,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 900,
      path: "/",
    });

    return {
        success: true,
        message: "OTP verified successfully",
    }

});