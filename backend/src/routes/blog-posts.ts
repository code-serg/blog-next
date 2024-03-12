import express from 'express';
import * as BlogPostController from '../controllers/blog-posts';
import { featuredImageUpload } from '../middleware/image-upload';
import requiresAuth from '../middleware/requiresAuth';
import validateRequestSchema from '../middleware/validareRequestSchema';
import { createBlogPostSchema, getBlogPostSchema } from '../validation/blog-post';

const router = express.Router();

router.get('/', validateRequestSchema(getBlogPostSchema), BlogPostController.getBlogPosts);

router.get('/slugs', BlogPostController.getAllBlogPostSlugs);

router.get('/post/:slug', BlogPostController.getBlogPostBySlug);

router.post(
  '/',
  requiresAuth,
  featuredImageUpload.single('featuredImage'),
  validateRequestSchema(createBlogPostSchema),
  BlogPostController.createBlogPost
);

export default router;
