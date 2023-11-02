// pre-configured instance of Axios for making HTTP requests (has baseURL set to the backend URL)
import api from '@/network/axiosInstance';
import { BlogPost } from '@/models/blog-post';

export async function getBlogPosts() {
  // Sending a GET request to the '/posts' endpoint.
  // The expected response data is an array of BlogPost objects.
  const response = await api.get<BlogPost[]>('/posts');
  return response.data;
}

interface CreateBlogPostValues {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export async function createBlogPost(input: CreateBlogPostValues) {
  // Sending a POST request to the '/posts' endpoint with the input data.
  // The expected response data is of type BlogPost.
  const response = await api.post<BlogPost>('/posts', input);
  return response.data;
}
