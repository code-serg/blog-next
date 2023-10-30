import { Button, Form } from 'react-bootstrap';

export default function CreateBlogPostPage() {
  return (
    <div>
      <h1>Create Blog Post</h1>
      <Form>
        <Form.Group className="mb-3" controlId="title-input">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" placeholder="Enter post title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug-input">
          <Form.Label>Post Slug</Form.Label>
          <Form.Control type="text" placeholder="Enter post slug" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="summary-input">
          <Form.Label>Post Summary</Form.Label>
          <Form.Control as="textarea" placeholder="Enter post summary" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body-input">
          <Form.Label>Post Body</Form.Label>
          <Form.Control as="textarea" placeholder="Enter post body" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
}
