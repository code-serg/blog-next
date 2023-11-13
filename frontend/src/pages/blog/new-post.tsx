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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFromData>();

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
          register={register('title', { required: 'Required' })}
          label="Post Title"
          placeholder="Enter Post Title"
          maxLength={105}
          error={errors.title}
        />
        <FormInputField
          register={register('slug', { required: 'Required' })}
          label="Post Slug"
          placeholder="Enter Post Slug"
          maxLength={105}
          error={errors.slug}
        />
        <FormInputField
          register={register('summary', { required: 'Required' })}
          label="Post Summary"
          placeholder="Enter Post Summary"
          maxLength={300}
          as="textarea"
          error={errors.summary}
        />
        <Form.Group className="mb-3" controlId="body-input">
          <Form.Label>Post Body</Form.Label>
          <Form.Control
            {...register('body', { required: 'Required' })}
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
