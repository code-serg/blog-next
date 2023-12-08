import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import UserModel from '../models/user';

// serializeUser determines which data of the user object should be stored in the session in the database.
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

// deserializeUser will call with the unique id provided by serializeUser
// to retrieve the user object.
passport.deserializeUser(async (userId: string, cb) => {
  // commonly seen is to return the user object from the database
  // but here we are opting to just return the object with the user id
  cb(null, { _id: new mongoose.Types.ObjectId(userId) });
});

passport.use(
  // local strategy is used for username/password based authentication
  new LocalStrategy(async (username, password, cb) => {
    try {
      // must use 'select' explicitly to get fields that are not returned/selected by default - see the model
      const existingUser = await UserModel.findOne({ username }).select('+email +password').exec();

      if (!existingUser || !existingUser.password) {
        return cb(null, false, { message: 'No such username / password.' });
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch) {
        return cb(null, false, { message: 'No such username / password.' });
      }

      const user = existingUser.toObject();
      delete user.password;
      return cb(null, user, { message: 'Logged In Successfully' });
    } catch (error) {
      cb(error);
    }
  })
);
