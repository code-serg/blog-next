import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as BlogApi from '@/network/api/blog';
import FormInputField from '@/components/FormInputField';

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
      <h1>Create a Post</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          register={register('title')}
          label="Post Title"
          placeholder="Enter Post Title"
          maxLength={105}
        />
        <FormInputField
          register={register('slug')}
          label="Post Slug"
          placeholder="Enter Post Slug"
          maxLength={105}
        />
        <FormInputField
          register={register('summary')}
          label="Post Summary"
          placeholder="Enter Post Summary"
          maxLength={300}
          as="textarea"
        />
        <Form.Group className="mb-3" controlId="body-input">
          <Form.Label>Post Body</Form.Label>
          <Form.Control {...register('body')} as="textarea" placeholder="Enter post body" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
}
