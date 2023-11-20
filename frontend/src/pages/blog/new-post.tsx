import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as BlogApi from '@/network/api/blog';
import FormInputField from '@/components/form/FormInputField';
import MarkdownEditor from '@/components/form/MarkdownEditor';
import { generateSlug } from '@/utils/utils';
import LoadingButton from '@/components/LoadingButton';

interface CreatePostFromData {
  title: string;
  slug: string;
  summary: string;
  body: string;
  // 'featureImage' must match as defined in backend routes/blog-posts.ts
  // react-hooks-form uses 'FileList' for file input.
  // backend uses File for type, so pass featuredImage[0] to createBlogPost
  featuredImage: FileList;
}

export default function CreateBlogPostPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFromData>();

  async function onSubmit({ title, slug, summary, body, featuredImage }: CreatePostFromData) {
    try {
      // call api to create post
      await BlogApi.createBlogPost({ title, slug, summary, body, featuredImage: featuredImage[0] });
      await router.push('/blog/' + slug);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function generateSlugFromTitle() {
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
        <FormInputField
          label="Post Image"
          register={register('featuredImage', { required: 'Required' })}
          type="file"
          accept="image/png, image/jpeg"
          error={errors.featuredImage}
        />
        <MarkdownEditor
          label="Post Body"
          register={register('body', { required: 'Required' })}
          setValue={setValue}
          watch={watch}
          error={errors.body}
        />
        <LoadingButton
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
        >
          Create Post
        </LoadingButton>
      </Form>
    </div>
  );
}
