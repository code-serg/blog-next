import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
import assertIsDefined from '../utils/assertIsDefined';

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

    // must be converted to a plain JS object first, to remove the password property
    const resultObject = result.toObject();
    delete resultObject.password;

    // hydrate() converts a plain JS object into a Mongoose document
    const newUser = UserModel.hydrate(resultObject);

    // req.logIn() is added to the request object by Passport
    req.logIn(newUser, (error) => {
      if (error) throw error;
      res.status(201).json(newUser);
    });
  } catch (error) {
    next(error);
  }
};

// upon successful login, the user is added to the request object by Passport's deserializer - Thus we can access it here
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const user = await UserModel.findById(authenticatedUser._id).select('+email').exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// req.logOut() is added to the request object by Passport
export const logout: RequestHandler = (req, res) => {
  req.logOut((error) => {
    if (error) throw error;

    res.sendStatus(200);
  });
};

export const getUserByUsername: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username }).exec();

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
