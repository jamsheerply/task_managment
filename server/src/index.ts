import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/mongo.config";
import userRouter from "./routers/user.router";
import taskRouter from "./routers/task.router";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const isProduction: boolean = process.env.NODE_ENV === "production";

// Connect to the database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
  })
);

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: false, message: err.message });
});

// Start server after connecting to the database
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
