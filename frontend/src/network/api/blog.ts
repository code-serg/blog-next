// pre-configured instance of Axios for making HTTP requests (has baseURL set to the backend URL)
import api from '@/network/axiosInstance';
import { BlogPost } from '@/models/blog-post';

export async function getBlogPosts() {
  // Sending a GET request to the '/posts' endpoint.
  // The expected response data is an array of BlogPost objects.
  const response = await api.get<BlogPost[]>('/posts');
  return response.data;
}

export async function getBlogPostsByUser(userId: string) {
  const response = await api.get<BlogPost[]>(`/posts?authorId=${userId}`);
  return response.data;
}

export async function getAllBlogPostSlugs() {
  // Sending a GET request to the '/posts/slugs' endpoint.
  // The expected response data is an array of strings.
  const response = await api.get<string[]>('/posts/slugs');
  return response.data;
}

export async function getBlogPostBySlug(slug: string) {
  // Sending a GET request to the '/posts/:slug' endpoint.
  // The expected response data is of type BlogPost.
  const response = await api.get<BlogPost>(`/posts/post/${slug}`);
  return response.data;
}

interface CreateBlogPostValues {
  slug: string;
  title: string;
  summary: string;
  body: string;
  featuredImage: File;
}

export async function createBlogPost(input: CreateBlogPostValues) {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Sending a POST request to the '/posts' endpoint with the input data.
  // The expected response data is of type BlogPost.
  const response = await api.post<BlogPost>('/posts', formData);
  return response.data;
}
