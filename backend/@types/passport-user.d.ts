import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface User extends mongoose.Document {
      _id: mongoose.Types.ObjectId;
    }
  }
}
