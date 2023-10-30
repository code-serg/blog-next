import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as BlogApi from '@/network/api/blog';

interface CreatePostFromData {
  title: string;
  slug: string;
  summary: string;
  body: string;
}

export default function CreateBlogPostPage() {
  const { register, handleSubmit } = useForm<CreatePostFromData>();

  async function onSubmit(input: CreatePostFromData) {
    try {
      // call api to create post
      await BlogApi.createBlogPost(input);
      alert('Post created successfully');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div>
      <h1>Create Blog Post</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="title-input">
          <Form.Label>Post Title</Form.Label>
          <Form.Control {...register('title')} placeholder="Enter post title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug-input">
          <Form.Label>Post Slug</Form.Label>
          <Form.Control {...register('slug')} placeholder="Enter post slug" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="summary-input">
          <Form.Label>Post Summary</Form.Label>
          <Form.Control
            {...register('summary')}
            as="textarea"
            placeholder="Enter post summary"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body-input">
          <Form.Label>Post Body</Form.Label>
          <Form.Control
            {...register('body')}
            as="textarea"
            placeholder="Enter post body"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
}
