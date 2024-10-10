import { NextFunction, Request, Response } from "express";
import taskValidationSchema from "../../utils/validation/taskValidation";
import taskModel from "../../model/task.model";

const addTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ status: false, message: error.message });
      return;
    }

    if (!req.user || !req.user._id) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const task = await new taskModel({
      ...req.body,
      space: req.user._id,
    }).save();

    if (!task) {
      res.status(500).json({ status: false, message: "Failed to create task" });
      return;
    }
    res
      .status(201)
      .json({ status: true, task, message: "task created successfully" });
  } catch (error) {
    console.error("Error during add task:", error);
    next(error);
  }
};

export default addTaskController;
