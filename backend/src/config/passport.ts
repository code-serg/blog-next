import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (userId: string, cb) => {
  const user = UserModel.hydrate({ _id: userId });
  cb(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const existingUser = await UserModel.findOne({ username }).select('+email +password').exec();

      if (!existingUser || !existingUser.password) {
        return cb(null, false);
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch) {
        return cb(null, false);
      }

      // must be converted to a plain JS object first, to remove the password property
      const existingUserPlainObject = existingUser.toObject();
      delete existingUserPlainObject.password;

      // Convert back into a Mongoose document
      const user = UserModel.hydrate(existingUserPlainObject);

      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  })
);
