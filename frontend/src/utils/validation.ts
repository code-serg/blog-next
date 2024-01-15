import * as yup from 'yup';

export const requiredStringSchema = yup.string().required('Required');

export const usernameSchema = yup
  .string()
  .min(4, 'Must be at least 4 characters')
  .max(20, 'Must be 20 characters or less')
  .matches(/^[a-zA-Z0-9_]*$/, 'Must only contain alphanumeric characters and underscores');

export const emailSchema = yup.string().email('Must be a valid email address');

export const passwordSchema = yup
  .string()
  .matches(/^(?!.* )/, 'Must not contain spaces')
  .min(6, 'Must be at least 6 characters');
