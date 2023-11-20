import express from 'express';
import * as BlogPostController from '../controllers/blog-posts';
import { featuredImageUpload } from '../middleware/image-upload';

const router = express.Router();

router.get('/', BlogPostController.getBlogPosts);
router.get('/slugs', BlogPostController.getAllBlogPostSlugs);
router.get('/post/:slug', BlogPostController.getBlogPostBySlug);
router.post('/', featuredImageUpload.single('featuredImage'), BlogPostController.createBlogPost);

export default router;
