/*
  We use this component to render a form input field - example extracted / refactored from frontend/src/pages/blog/new-post.tsx:
    <Form.Group className="mb-3" controlId="title-input">
      <Form.Label>Post Title</Form.Label>
      <Form.Control {...register('title')} placeholder="Enter post title" />
    </Form.Group>
*/

import { ComponentProps } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputFieldProps {
  // the register function from react-hook-form is of type UseFormRegisterReturn
  register: UseFormRegisterReturn;
  label?: string;
  error?: FieldError;
}

// '&' is the Intersection Type operator - allows the function to accept additional props
// FormControlProps is a type from react-bootstrap (hover over a "<Form.Control />" entry to see the type definition)
// Also add '...props' and now the function can accept additional props that are passed to the <Form.Control /> such as "placeholder"
// maxLenght does not belong to the Form.Control props, but it belongs to the native input field props. So we add 'ComponentProps<"input">'
export default function FormInputField({
  register,
  label,
  error,
  ...props
}: FormInputFieldProps & FormControlProps & ComponentProps<'input'>) {
  return (
    <Form.Group
      className="mb-3"
      controlId={register.name + '-input'}
    >
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...register}
        {...props}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    </Form.Group>
  );
}
