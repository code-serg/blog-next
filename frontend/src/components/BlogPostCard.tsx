import { BlogPost } from '@/models/blog-post';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { formatDate } from '@/utils/utils';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post: { slug, title, summary, createdAt } }: BlogPostCardProps) {
  const postLink = `/blog/${slug}`;

  return (
    <Card className="mb-4">
      <article>
        <Card.Body>
          <Card.Title>
            <Link href={postLink}>{title}</Link>
          </Card.Title>
          <Card.Text>{summary}</Card.Text>
          <Card.Text className="text-muted small">
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </Card.Text>
        </Card.Body>
      </article>
    </Card>
  );
}
