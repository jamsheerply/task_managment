import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  space: {
    type: Schema.Types.ObjectId,
    ref: "Space",
  },
  title: {
    required: true,
    type: String,
  },
  task: {
    required: true,
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const taskModel = model("Task", taskSchema);
export default taskModel;
