import { Col, Row } from 'react-bootstrap';
import BlogPostCard from './BlogPostCard';
import { BlogPost } from '@/models/blog-post';
import styles from '@/styles/BlogPostsGrid.module.css';

interface BlogPostsGridProps {
  posts: BlogPost[];
}

export default function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  return (
    <Row xs={1} sm={2} lg={3} className="g-3">
      {posts.map((post) => (
        <Col key={post._id} className="g-2">
          <BlogPostCard key={post._id} post={post} className={styles.card} />
        </Col>
      ))}
    </Row>
  );
}
