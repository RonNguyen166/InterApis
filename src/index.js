import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import parentRouter from "./routes/parent.route.js";
import classRouter from "./routes/class.route.js";
import studentRouter from "./routes/student.route.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";
import ApiError from "./utils/ApiError.js";
import httpStatus from "http-status";

const app = express();

mongoose.connect("mongodb://localhost", () =>
  console.log("Connect sussesfull")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/parents", parentRouter);
app.use("/students", studentRouter);
app.use("/classes", classRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`listening on port http://localhost:${process.env.PORT}`)
);
