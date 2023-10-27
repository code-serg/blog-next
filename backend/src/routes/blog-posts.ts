import express from 'express';
import * as BlogPostController from '../controllers/blog-posts';

const router = express.Router();

router.get('/', BlogPostController.getBlogPosts);
router.post('/', BlogPostController.createBlogPost);

export default router;
