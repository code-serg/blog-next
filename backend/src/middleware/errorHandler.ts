import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';

// next is not used, but must be included for express to recognize this as an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = 'Unknown error';
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
