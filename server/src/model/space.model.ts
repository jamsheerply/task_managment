import { model, Schema } from "mongoose";

const spaceSchema = new Schema(
  {
    spaceName: {
      required: true,
      type: String,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const spaceModel = model("Space", spaceSchema);
export default spaceModel;
