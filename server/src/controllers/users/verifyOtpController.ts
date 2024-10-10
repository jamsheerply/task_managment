import { NextFunction, Request, Response } from "express";
import otpModel from "../../model/otp.model";
import { hashPassword } from "../../utils/hashPassword";
import userModel from "../../model/user.model";
import { generateToken } from "../../utils/generateToken";
import otpValidationSchema from "../../utils/validation/otpValidation";

export const cookieOptions = {
  expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
  httpOnly: true, // Accessible only by the web server
  secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
  // sameSite: "strict", // Helps protect against CSRF attacks
};

const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password, username } = req.body;
    console.log(req.body);
    // Validate input
    const { error } = otpValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ status: false, message: error.message });
      return;
    }

    // Check if OTP exists for the given email
    const savedOtp = await otpModel.findOne({ email });
    if (!savedOtp) {
      res
        .status(400)
        .json({ status: false, message: "OTP not found for this email." });
      return;
    }

    // Validate OTP
    if (savedOtp && savedOtp.otp === otp) {
      const hashedPassword = hashPassword(password);
      const user = await new userModel({
        email,
        username,
        password: hashedPassword,
      }).save();

      // Check if user was created successfully
      if (user.email) {
        const token = generateToken({ _id: user._id, email: user.email });
        res
          .cookie("token", token, cookieOptions)
          .status(201)
          .json({
            status: true,
            user: { _id: user._id, email: user.email, username: user.username },
            message: "User created successfully",
          });
      } else {
        res
          .status(500)
          .json({ status: false, message: "Failed to create user." });
      }
    } else {
      // Optionally remove the OTP here if you want to invalidate it after a wrong attempt
      res
        .status(400)
        .json({ status: false, message: "Wrong OTP. Check and re-enter." });
    }
  } catch (error) {
    next(error);
  }
};

export default verifyOtpController;
