import { RequestHandler } from 'express';
import BlogPostModel from '../models/blog-post';

// using const instead of function - this syntax allows for defining the type - then req, res, next are automatically typed
// function can be used, but then req, res, and next type must be indivually defined
export const getBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    const allBlogPosts = await BlogPostModel.find().exec();

    res.status(200).json(allBlogPosts);
  } catch (error) {
    res.status(500).json({ error });
  }
};
