import * as yup from 'yup';
import { imageFileSchema, objectIdSchema } from '../utils/validation';

const blogPostBodySchema = yup.object({
  title: yup.string().required().max(105),
  slug: yup
    .string()
    .required()
    .max(105)
    .matches(/^[a-zA-Z0-9_-]*$/),
  summary: yup.string().required().max(300),
  body: yup.string().required(),
});

export type BlogPostBody = yup.InferType<typeof blogPostBodySchema>;

export const createBlogPostSchema = yup.object({
  body: blogPostBodySchema,
  file: imageFileSchema.required('Featured image is required'),
});

// when getting blog posts, check whether the optional authorId query parameter is a valid object id
export const getBlogPostSchema = yup.object({
  query: yup.object({
    authorId: objectIdSchema,
  }),
});

export type GetBlogPostQuery = yup.InferType<typeof getBlogPostSchema>['query'];
