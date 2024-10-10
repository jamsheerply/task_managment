import { Router } from "express";
import addTaskController from "../controllers/tasks/addTaskController";
import deleteTaskController from "../controllers/tasks/deleteTaskController";
import updateTaskController from "../controllers/tasks/updateTaskController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import readTaskController from "../controllers/tasks/readTaskController";

const taskRouter = Router();

taskRouter.post("/add-task", jwtMiddleware, addTaskController);
taskRouter.patch("/update-task/:id", jwtMiddleware, updateTaskController);
taskRouter.delete("/delete-task/:id", jwtMiddleware, deleteTaskController);
taskRouter.get("/read-task", jwtMiddleware, readTaskController);

export default taskRouter;
