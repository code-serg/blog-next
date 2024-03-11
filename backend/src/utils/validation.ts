import mongoose from 'mongoose';
import { validateBufferMIMEType } from 'validate-image-type';
import * as yup from 'yup';

export const imageFileSchema = yup
  .mixed<Express.Multer.File>()
  .test('valid-image', 'Not a valid image', async (file) => {
    if (!file) return true; // allow empty values - image is optional

    const result = await validateBufferMIMEType(file.buffer, {
      allowMimeTypes: ['image/jpeg', 'image/png'],
    });

    return result.ok;
  });

export const objectIdSchema = yup
  .string()
  .test(
    'is-valid-object-id',
    '${path} is not a valid object id',
    (value) => !value || mongoose.Types.ObjectId.isValid(value)
  );
