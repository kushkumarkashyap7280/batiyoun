import { CompleteSignupUserData ,completeSignupUserSchema } from "@batiyoun/common";
import { routeWrapper } from "@/lib/api";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiError } from "@batiyoun/common";
import { UsernameData,UsernameSchema } from "@batiyoun/common";

export const POST = routeWrapper(async (request: Request) => {
   
    const {username} = UsernameSchema.parse(await request.json()) as UsernameData

    const existingUser = await prisma.user.findUnique({ where: { username } })
    if (existingUser) {
        throw new ApiError("Username already taken", 400)
    }


    return {
        success: true,
        message: "Username is available",
    }
});