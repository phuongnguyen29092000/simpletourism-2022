const ApiError = require("../utils/ApiError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApiError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, 400);
};

const handleJWTError = () =>
  new ApiError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new ApiError("Your token has expired! Please log in again.", 401);

const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: "Something went wrong!",
      msg: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      title: "Error Occur, Check Your Console!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // let error = { ...err };
  // error.message = err.message;

  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  sendError(err, req, res);
};
