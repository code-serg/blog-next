import express from 'express';
import * as BlogPostController from '../controllers/blog-posts';
import { featuredImageUpload } from '../middleware/image-upload';
import requiresAuth from '../middleware/requiresAuth';

const router = express.Router();

router.get('/', BlogPostController.getBlogPosts);

router.get('/slugs', BlogPostController.getAllBlogPostSlugs);

router.get('/post/:slug', BlogPostController.getBlogPostBySlug);

router.post(
  '/',
  requiresAuth,
  featuredImageUpload.single('featuredImage'),
  BlogPostController.createBlogPost
);

export default router;
