import { BlogPost } from '@/models/blog-post';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import BlogPostGrid from '@/components/BlogPostsGrid';
import * as BlogApi from '@/network/api/blog';

// typescript interface for the props object
interface BlogPageProps {
  posts: BlogPost[];
}

// function for server-side data fetching
// fetch the blog posts and send them as props to the component during server-side rendering.
export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
  const posts = await BlogApi.getBlogPosts();

  return { props: { posts } };
};

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <>
      <Head>
        <title>Articles - Blog</title>
        <meta name="description" content="Full Stack Blog with MERN + Next.js" />
      </Head>
      <div>
        <h1>Blog Next</h1>
        <BlogPostGrid posts={posts} />
      </div>
    </>
  );
}
