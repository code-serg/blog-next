import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';

interface SignUpBody {
  username: string;
  password: string;
  email: string;
}
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;
  try {
    const existingUsername = await UserModel.findOne({ username })
      .collation({ locale: 'en', strength: 1 })
      .exec();

    if (existingUsername) {
      throw createHttpError(409, 'Username already exists');
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const result = await UserModel.create({
      username,
      displayName: username,
      email,
      password: passwordHashed,
    });

    // remove password from result before sending it back
    const newUser = result.toObject();
    delete newUser.password;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
