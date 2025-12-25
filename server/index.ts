import express, { Express } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import globalErrorHandler from "./controller/errorController.js";
import designRouter from "./routes/designRoutes.js";
import userRouter from "./routes/userRoutes.js";
import appError from "./utils/appError.js";
import path from "path";

process.on("uncaughtException", (err: Error) => {
  console.log("💥 UNCAUGHT EXCEPTION 💥, shutting down...");
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app: Express = express();

app.use(
  helmet({
    // To be abel to get the images in the front side
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// app.use(expresss.json({ limit: "10kb" }));
app.use((req, res, next) => {
  next();
});

app.use("/public/", express.static("public"));

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;
if (!DB) throw new appError("DATABASE is not defined in environment variables", 500);

const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.use("/api/v1/designs", designRouter);
app.use("/api/v1/users", userRouter);

mongoose.connect(DB).then(() => console.log("DB connection successful"));

app.use(globalErrorHandler);

process.on("unhandledRejection", (err) => {
  console.log("💥 UNHANDLERD REJECTION 💥, shutting down...");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
