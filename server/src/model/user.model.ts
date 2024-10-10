import { Schema, model } from "mongoose";

// Define the schema with proper syntax
const userSchema = new Schema({
    username: {
        required: true,
        type: String,
    },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: false,
    type: String,
  }
}, { 
  timestamps: true
});

// Export the user model
const userModel = model("User", userSchema);
export default userModel;

