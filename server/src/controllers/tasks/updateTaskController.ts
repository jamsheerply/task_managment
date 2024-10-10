import { NextFunction, Request, Response } from "express";
import taskValidationSchema from "../../utils/validation/taskValidation";
import taskModel from "../../model/task.model";
import { Console } from "console";

const updateTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;

    const { error } = taskValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ status: false, message: error.message });
      return;
    }

    // Update the task and return the updated document
    const updated = await taskModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!updated) {
      res.status(500).json({ status: false, message: "Failed to update task" });
      return;
    }

    // Successfully updated the task and returning updated document
    res
      .status(201)
      .json({ status: true, updated, message: "Task updated successfully" });
    return;
  } catch (error) {
    console.error("Error during update task:", error);
    next(error);
  }
};

export default updateTaskController;
