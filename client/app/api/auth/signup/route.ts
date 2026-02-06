import { routeWrapper } from "@/lib/api";
import { hashPassword } from "@/utils/hashPassword";
import prisma from "@/lib/prisma";
import { completeSignupUserSchema ,CompleteSignupUserData} from "@batiyoun/common";
import { ApiError } from "@batiyoun/common";
import { cookies } from "next/headers";

import { env } from "@/config/env";
import { verifyVerifyToken } from "@/utils/tokens";

export const POST = routeWrapper(async (request: Request) => {
    const { username, fullName, bio, password} = completeSignupUserSchema.parse(await request.json()) as CompleteSignupUserData
        const cookieStore = await cookies();
    const verifytoken = cookieStore.get("verify_token")?.value;

    if (!verifytoken) {
        throw new ApiError("Verification token missing. Please verify your email first.", 400);
    }

    const { email, type } = await verifyVerifyToken(verifytoken);

    if (type !== "SIGNUP") {
        throw new ApiError("Invalid token type. Please verify your email for signup.", 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new ApiError("Email already in use", 400)
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } })
    if (existingUsername) {
        throw new ApiError("Username already taken", 400)
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            username,
            fullName,
            bio,
            passwordHash: hashedPassword,
        }
    })

    if(!user) {
        throw new ApiError("Failed to create user", 500)
    }

        cookieStore.delete("verify_token");

    return {
        success: true,
        message: "User created successfully",
    }
});