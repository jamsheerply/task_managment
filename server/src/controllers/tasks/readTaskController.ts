import { NextFunction, Request, Response } from "express";
import taskModel from "../../model/task.model";
import { Types } from "mongoose";

const readTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, search = "", status } = req.query;
    const userId = req.user?._id;

    const full = await taskModel.find({});

    if (!userId) {
      throw new Error("User ID is undefined");
    }

    // Convert userId to ObjectId
    const userObjectId = new Types.ObjectId(userId);

    // Build the filter object
    const filter: any = { space: userObjectId };

    // Only add status to filter if it's explicitly provided and valid
    if (status === "true" || status === "false") {
      filter.status = status === "true";
    }

    // Ensure that the space field is an ObjectId in the filter
    if (filter.space && !(filter.space instanceof Types.ObjectId)) {
      filter.space = new Types.ObjectId(filter.space);
    }

    // Add search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { task: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Fetch tasks with pagination and filtering
    const tasks = await taskModel
      .find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ _id: -1 });

    // Get total count of matching documents
    const total = await taskModel.countDocuments(filter);

    // Calculate total pages
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      success: true,
      data: tasks,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
    });
  } catch (error) {
    console.error("Error in readTaskController:", error);
    next(error);
  }
};

export default readTaskController;
