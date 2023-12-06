import { BlogPost } from '@/models/blog-post';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as BlogApi from '@/network/api/blog';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatTime } from '@/utils/utils';
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
  const createdOrUpdated = createdAt !== updatedAt ? 'Updated' : 'Created';
  const date = formatDate(updatedAt); // the 'updatedAt' is always the latest
  const time = formatTime(updatedAt);

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
        <div className="text-center mb-3">
          <Link href="/blog"> &larr; Blog Home </Link>
        </div>
        <article>
          <div className="d-flex flex-column align-items-center">
            <h2 className="text-center mb-3">{title}</h2>
            <p className="mb-3 h5">{summary}</p>
            <span className="text-muted mb-2">{`${createdOrUpdated} on ${date} at ${time}`}</span>
            <div className={styles.featuredImageWrapper}>
              <Image
                src={featuredImageUrl}
                alt="Featured Image"
                fill
                priority
                className="rounded"
              />
            </div>
            <p>{body}</p>
          </div>
        </article>
      </div>
    </>
  );
}
