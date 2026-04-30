import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiRes";
import { ApiError } from "../utils/apiError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import {z } from "zod";



// Create a new user
const createBUserInputDataSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  password: z.string().optional(),
});

type createBUser = z.infer<typeof createBUserInputDataSchema>;


const createBUser = asyncHandler(async (req, res) => {
  try {
    console.log("Received user creation request with data:", req.body);
    const { username, email, fullName, password } = createBUserInputDataSchema.parse(req.body);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    console.log("Existing user check result:", existingUser);
    if (existingUser) {
      throw new ApiError(400, "User with this email or username already exists");
    }

    const newUser: any = new User({
      username,
      email,
      fullName,
      password,
    });

    await newUser.save();

    console.log("New user created:", newUser);

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json(new ApiResponse(201,  {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName,
    }, "User created successfully"));
  } catch (err: any) {
    console.error("createBUser error:", err && (err.stack || err.message || err));
    throw err;
  }
});


// login user 

const loginBUserInputDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type loginBUser = z.infer<typeof loginBUserInputDataSchema>;

const loginBUser = asyncHandler(async (req, res) => {
  const { email, password } = loginBUserInputDataSchema.parse(req.body);

  const user: any = await User.findOne({ email });
  if (!user || !user.password) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json(new ApiResponse(200, {
    _id: user._id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
  }, "User logged in successfully"));
});


// Verify the current user

const verifyMeBUser = asyncHandler(async (req, res) => {
  const token = req.cookies["access_token"];

  if (!token) {
    throw new ApiError(401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as any;
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user, "User verified successfully"));
  } catch (err) {
    throw new ApiError(401, "session expired, please login again");
  }
});



// Logout user

const logoutBUser = asyncHandler(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
});

// find user by Username with prefix
const findBUserByUsername = asyncHandler(async (req, res) => {
  const prefix = (req.query.prefix as string) || "";
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const query = { username: { $regex: `^${prefix}`, $options: "i" } };

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await User.countDocuments(query);

  res.status(200).json(new ApiResponse(200, {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total
    }
  }, "Users found successfully"));
}); 

export { createBUser, loginBUser, verifyMeBUser, logoutBUser, findBUserByUsername };


