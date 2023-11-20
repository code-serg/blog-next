import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import BlogPostModel from '../models/blog-post';
import assertIsDefined from '../utils/assertIsDefined';
import env from '../env';

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

// Why this? Because of getStaticPaths in pages/blog/[slug].tsx
export const getAllBlogPostSlugs: RequestHandler = async (req, res, next) => {
  try {
    const results = await BlogPostModel.find({}, { slug: 1 }).exec();
    const slugs = results.map((result) => result.slug);

    res.status(200).json(slugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getBlogPostBySlug: RequestHandler<{ slug: string }> = async (req, res, next) => {
  try {
    const blogPost = await BlogPostModel.findOne({ slug: req.params.slug }).exec();

    if (!blogPost) {
      return res.sendStatus(404);
    }

    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
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
export const createBlogPost: RequestHandler<unknown, unknown, BlogPostBody, unknown> = async (
  req,
  res,
  next
) => {
  const { slug, title, summary, body } = req.body;
  const featuredImage = req.file;

  try {
    assertIsDefined(featuredImage);

    const blogPostId = new mongoose.Types.ObjectId();

    const featureImageDestinationPath = '/uploads/featured-images/' + blogPostId + '.png';

    await sharp(featuredImage.buffer)
      .resize(700, 450)
      .toFile('./' + featureImageDestinationPath);

    const newPost = await BlogPostModel.create({
      _id: blogPostId,
      slug,
      title,
      summary,
      body,
      featuredImageUrl: env.SERVER_URL + featureImageDestinationPath,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
