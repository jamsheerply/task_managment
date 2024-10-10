import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120,
    },
  },
  {
    timestamps: true,
  }
);

const otpModel = model("Otp", otpSchema);
export default otpModel;
