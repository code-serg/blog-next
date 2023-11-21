import { BlogPost } from '@/models/blog-post';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as BlogApi from '@/network/api/blog';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/BlogPostPage.module.css';

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await BlogApi.getAllBlogPostSlugs();

  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug?.toString();
  if (!slug) throw Error('Missing slug');

  const post = await BlogApi.getBlogPostBySlug(slug);

  return { props: { post } };
};

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({
  post: { _id, slug, title, summary, body, featuredImageUrl, createdAt, updatedAt },
}: BlogPostPageProps) {
  return (
    <>
      <Head>
        <title>{`${title} - Blog Next`}</title>
        <meta
          name="description"
          content={summary}
        />
      </Head>
      <div className={styles.container}>
        <Link href="/blog"> &larr; Blog Home </Link>
        <h1>{title}</h1>
        <p>{summary}</p>
        {/* <Image
          src={featuredImageUrl}
          alt={title}
          width={300}
          height={200}
        /> */}
        <p>{body}</p>
        <p>{createdAt}</p>
        <p>{updatedAt}</p>
      </div>
    </>
  );
}
