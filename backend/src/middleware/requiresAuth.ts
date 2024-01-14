import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

const requiresAuth: RequestHandler = (req, res, next) => {
  // if user has been authenticated by Passport, req.user will be defined
  if (req.user) {
    next();
  } else {
    next(createHttpError(401, 'User is not authenticated'));
  }
};

export default requiresAuth;
