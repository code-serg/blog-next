import { BlogPost } from '@/models/blog-post';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

interface BlogPostEntryProps {
  post: BlogPost;
}

export default function BlogPostEntry({ post: { slug, title, summary, createdAt } }: BlogPostEntryProps) {
  const postLink = `/blog/${slug}`;

  return (
    <Card className="mb-4">
      <article>
        <Card.Body>
          <Card.Title>
            <Link href={postLink}>{title}</Link>
          </Card.Title>
          <Card.Text>{summary}</Card.Text>
          <Card.Text>{createdAt}</Card.Text>
        </Card.Body>
      </article>
    </Card>
  );
}
