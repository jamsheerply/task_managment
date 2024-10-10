import { NextFunction, Request, Response } from "express";
import taskModel from "../../model/task.model";

const deleteTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    console.log(taskId);

    const deleted = await taskModel.findByIdAndDelete(taskId);
    if (!deleted) {
      res.status(500).json({ status: false, message: "Failed to delete task" });
      return;
    }
    res
      .status(201)
      .json({ status: true, deleted, message: "task deleted successfully" });
    return;
  } catch (error) {
    console.error("Error during deleting task:", error);
    next(error);
  }
};

export default deleteTaskController;
