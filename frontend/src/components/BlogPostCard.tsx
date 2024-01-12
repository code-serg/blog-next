import { BlogPost } from '@/models/blog-post';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { formatDate } from '@/utils/utils';
import UserProfileLink from './UserProfileLink';

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogPostCard({
  post: { slug, title, featuredImageUrl, author, createdAt },
  className,
}: BlogPostCardProps) {
  const postLink = `/blog/${slug}`;

  return (
    <Card className={className}>
      <article>
        <Link href={postLink}>
          <Image
            src={featuredImageUrl}
            alt="Post Featured Image"
            width={700}
            height={200}
            className="card-img-top object-fit-cover"
          />
        </Link>
        <Card.Body>
          <Card.Title>
            <Link href={postLink}>{title}</Link>
          </Card.Title>
          <Card.Text>
            <UserProfileLink user={author} />
          </Card.Text>
          <Card.Text className="text-muted small">
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </Card.Text>
        </Card.Body>
      </article>
    </Card>
  );
}
