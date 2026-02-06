import { routeWrapper } from "@/lib/api";
import { setOtpWithRateLimit } from "@/lib/redis";
import { NextResponse } from "next/server";
import { generateOtp } from "@/utils/otp";
import { SendOtpData ,sendOtpSchema ,OtpType} from "@batiyoun/common";
import { sendOtpEmail } from "@/lib/resend";
import prisma from "@/lib/prisma";

export const POST = routeWrapper(async (request: Request) => {
    const {email, type} = sendOtpSchema.parse(await request.json()) as SendOtpData
   
    // 1. Check if user exists based on type
    if (type === "SIGNUP") {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 })
        }
    } else if (type === "RESET_PASSWORD" || type === "FORGOT_PASSWORD") {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (!existingUser) {
            return NextResponse.json({ success: false, message: "No user found with this email" }, { status: 404 })
        }
    }
 
    const otp = generateOtp()

    const isOtpSet = await setOtpWithRateLimit(email, otp);

    if (isOtpSet) {
        await sendOtpEmail( otp,email, type);
    }

    return {
        success: true,
        message: "OTP sent successfully",
    }

});