import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as BlogApi from '@/network/api/blog';
import FormInputField from '@/components/form/FormInputField';
import MarkdownEditor from '@/components/form/MarkdownEditor';
import { generateSlug } from '@/utils/utils';

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
    setValue,
    watch,
    getValues,
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

  function generateSlugFromTitle(title: string) {
    if (getValues('slug')) return; // do nothing if slug already exists

    const slug = generateSlug(getValues('title'));
    setValue('slug', slug, { shouldValidate: true });
  }

  return (
    <div>
      <h1>Create a Post</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          label="Post Title"
          register={register('title', { required: 'Required' })}
          placeholder="Enter Post Title"
          maxLength={105}
          error={errors.title}
          onBlur={generateSlugFromTitle}
        />
        <FormInputField
          label="Post Slug"
          register={register('slug', { required: 'Required' })}
          placeholder="Enter Post Slug"
          maxLength={105}
          error={errors.slug}
        />
        <FormInputField
          label="Post Summary"
          register={register('summary', { required: 'Required' })}
          placeholder="Enter Post Summary"
          maxLength={300}
          as="textarea"
          error={errors.summary}
        />
        <MarkdownEditor
          label="Post Body"
          register={register('body', { required: 'Required' })}
          setValue={setValue}
          watch={watch}
          error={errors.body}
        />
        <Button
          variant="primary"
          type="submit"
        >
          Create Post
        </Button>
      </Form>
    </div>
  );
}
