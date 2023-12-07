import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true, select: false },
    displayName: { type: String },
    about: { type: String },
    profileImageUrl: { type: String },
    password: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true, select: false },
    githubId: { type: String, unique: true, sparse: true, select: false },
  },
  { timestamps: true }
);

// must use 'function' here to allow 'this' to be bound correctly
userSchema.pre('validate', function (next) {
  if (!this.email && !this.googleId && !this.githubId) {
    return next(new Error('Email or a Social Provide ID is required'));
  }
  next();
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
