import { BlogPost } from '@/models/blog-post';
// pre-configured instance of Axios for making HTTP requests (has baseURL set to the backend URL)
import api from '@/network/axiosInstance';

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
