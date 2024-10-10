import { NextFunction, Request, Response } from "express";
import loginValidationSchema from "../../utils/validation/loginValidation";
import userModel from "../../model/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken";
import { cookieOptions } from "./verifyOtpController";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ status: false, errors: error.message });
      return;
    }

    // Check if user exists
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    // Compare password
    const passCompare = bcrypt.compareSync(password, userExist.password);
    if (!passCompare) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    // Generate token and send response
    const token = generateToken({
      _id: userExist._id,
      email: userExist.email as string,
    });
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        status: true,
        data: { _id: userExist._id, email: userExist.email },
        message: "Login successful",
      });
  } catch (error) {
    next(error);
  }
};

export default loginController;
