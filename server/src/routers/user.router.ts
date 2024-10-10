import { Router } from "express";
import loginController from "../controllers/users/loginController";
import logoutController from "../controllers/users/logoutController";
import signupController from "../controllers/users/signupController";
import verifyOtpController from "../controllers/users/verifyOtpController";
import verifyUserController from "../controllers/users/verifyUserController";

const userRouter = Router();

userRouter.post("/signup", signupController);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.post("/login", loginController);
userRouter.get("/verify-user", verifyUserController);
userRouter.delete("/logout", logoutController);

export default userRouter;
