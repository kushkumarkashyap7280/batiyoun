import { Router } from "express";
import { createBUser, loginBUser , verifyMeBUser, logoutBUser, findBUserByUsername } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/create-buser", createBUser);
userRouter.get("/verify-me-buser", verifyMeBUser);
userRouter.post("/login-buser", loginBUser);
userRouter.post("/logout-buser", logoutBUser);
userRouter.get("/search-buser", findBUserByUsername);




export default userRouter;