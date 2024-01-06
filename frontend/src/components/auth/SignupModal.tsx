import { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as UsersApi from '@/network/api/users';
import FormInputField from '../form/FormInputField';
import PasswordInputField from '../form/PasswordInputField';
import LoadingButton from '../LoadingButton';
import { BadRequestError, ConflictError } from '@/network/http-errors';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

interface SignupModalProps {
  onDismiss: () => void;
  onLoginInstead: () => void;
}

export default function SignupModal({ onDismiss, onLoginInstead }: SignupModalProps) {
  const { userMutate } = useAuthenticatedUser();

  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  async function onSubmit(credentials: SignupFormData) {
    try {
      setErrorText(null);
      const newUser = await UsersApi.signup(credentials);
      // since we have the user, update the cache/SWR right away (a bit quicker than waiting for the SWR to update itself)
      userMutate(newUser);
      onDismiss();
    } catch (error) {
      if (error instanceof ConflictError || error instanceof BadRequestError) {
        setErrorText(error.message);
      } else {
        console.error(error);
        alert(error);
      }
    }
  }

  return (
    <Modal
      show
      onHide={onDismiss}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FormInputField
            register={register('username')}
            label="Username"
            placeholder="Enter Username"
            error={errors.username}
          />
          <FormInputField
            register={register('email')}
            label="Email"
            type="email"
            placeholder="Enter Email"
            error={errors.email}
          />
          <PasswordInputField
            register={register('password')}
            label="Password"
            placeholder="Enter Password"
            error={errors.password}
          />
          <LoadingButton
            isLoading={isSubmitting}
            type="submit"
            className="w-100"
          >
            Sign Up
          </LoadingButton>
        </Form>

        <div className="d-flex align-items-center justify-content-center mt-2 gap-2">
          <span>Already have an account?</span>
          <Button
            variant="link"
            className="p-0"
            onClick={onLoginInstead}
          >
            Log In
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
