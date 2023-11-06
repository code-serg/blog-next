import { RequestHandler } from 'express';
import BlogPostModel from '../models/blog-post';

// using const instead of function - this syntax allows for defining the type - then req, res, next are automatically typed
// function can be used, but then req, res, and next type must be indivually defined
export const getBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    const allBlogPosts = await BlogPostModel.find().sort({ _id: -1 }).exec();

    res.status(200).json(allBlogPosts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

interface BlogPostBody {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

// RequestHandler type parameters:
// 1. Params: URL parameters type. Set to `unknown` since we aren't expecting any specific parameters.
// 2. ResBody: Response body type. Set to `unknown` as the response structure isn't explicitly typed.
// 3. ReqBody: Request body type. It's of type `BlogPostBody` as we expect the request body to match this structure.
// 4. Query: Query string parameters type. Set to `unknown` since no specific query parameters are expected.
export const createBlogPost: RequestHandler<unknown, unknown, BlogPostBody, unknown> = async (req, res, next) => {
  const { slug, title, summary, body } = req.body;

  try {
    const newPost = await BlogPostModel.create({
      slug,
      title,
      summary,
      body,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
