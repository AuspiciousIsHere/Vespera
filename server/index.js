import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import globalErrorHandler from "./controller/errorController.js";
// import categoryRouter from "./routes/categoryRoutes.js";
import designRouter from "./routes/designRoutes.js";
import userRouter from "./routes/userRoutes.js";

process.on("uncaughtException", (err) => {
  console.log("💥 UNCAUGHT EXCEPTION 💥, shutting down...");
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = express();

// app.set(`'view engine',"pug")

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
  // console.log("req cookie", req.cookies);
  next();
});

app.use("/public/", express.static("public"));

// const DB = process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// setupSocket(server);

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
