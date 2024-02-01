import * as yup from 'yup';
import { imageFileSchema } from '../utils/validation';

const usernameSchema = yup
  .string()
  .min(4, 'Min 4 characters')
  .max(20, '20 characters or less')
  .matches(/^[a-zA-Z0-9_]*$/, 'only alphanumeric characters and underscores');

const emailSchema = yup.string().email('Must be a valid email address');

const passwordSchema = yup
  .string()
  .matches(/^(?!.* )/, 'Must not contain spaces')
  .min(6, 'Must be at least 6 characters');

export const signupSchema = yup.object({
  body: yup.object({
    username: usernameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
  }),
});

export type SignupBody = yup.InferType<typeof signupSchema>['body'];

export const updateUserSchema = yup.object({
  body: yup.object({
    username: usernameSchema,
    displayName: yup.string().max(24, '24 characters or less'),
    about: yup.string().max(300),
  }),
  file: imageFileSchema,
});

export type UpdateUserBody = yup.InferType<typeof updateUserSchema>['body'];
