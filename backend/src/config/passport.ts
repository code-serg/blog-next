import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (userId: string, cb) => {
  // hydrate() converts a plain JS object into a Mongoose document
  const user = UserModel.hydrate({ _id: userId });
  cb(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      // lean() returns a plain JS object instead of a Mongoose document
      const existingUser = await UserModel.findOne({ username }).select('+email +password').lean();

      if (!existingUser || !existingUser.password) {
        return cb(null, false);
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch) {
        return cb(null, false);
      }

      // bc existingUser is a plain JS object, we can delete the password property
      delete existingUser.password;
      // It appears Passport requires a Mongoose Document in this function...
      // So we hydrate() - convert a plain JS object into a Mongoose document
      const userObject = UserModel.hydrate(existingUser);
      return cb(null, userObject);
    } catch (error) {
      cb(error);
    }
  })
);
