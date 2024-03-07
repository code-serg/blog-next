import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
import assertIsDefined from '../utils/assertIsDefined';
import { SignupBody, UpdateUserBody } from '../validation/users';
import sharp from 'sharp';
import env from '../env';

export const signUp: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
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

export const updateUser: RequestHandler<unknown, unknown, UpdateUserBody, unknown> = async (
  req,
  res,
  next
) => {
  const { username, displayName, about } = req.body;
  const profileImage = req.file;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    if (username) {
      const existingUsername = await UserModel.findOne({ username })
        .collation({ locale: 'en', strength: 1 })
        .exec();

      if (existingUsername) {
        throw createHttpError(409, 'Username already exists');
      }
    }

    let profileImageDestinationPath: string | undefined = undefined;

    if (profileImage) {
      // path/filename is always the same for the user, thus overwriting the previous image is automatically handled
      profileImageDestinationPath = '/uploads/profile-images/' + authenticatedUser._id + '.png';

      await sharp(profileImage.buffer)
        .resize(500, 500, { withoutEnlargement: true })
        .toFile('./' + profileImageDestinationPath);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      authenticatedUser._id,
      {
        // only update the fields that are present in the request body
        $set: {
          ...(username && { username }),
          ...(displayName && { displayName }),
          ...(about && { about }),
          ...(profileImage && { profilePicUrl: env.SERVER_URL + profileImageDestinationPath }),
        },
      },
      { new: true }
    ).exec();

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
