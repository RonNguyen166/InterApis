import mongoose from "mongoose";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, status } = err;
  if (process.env.NODE_ENV !== "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }
  res.locals.errorMessage = message;
  const response = {
    code: statusCode,
    status: status,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }
  return res.status(statusCode).json(response);
};

export { errorConverter, errorHandler };
