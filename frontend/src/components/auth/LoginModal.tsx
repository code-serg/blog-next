import { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as UsersApi from '@/network/api/users';
import FormInputField from '../form/FormInputField';
import LoadingButton from '../LoadingButton';
import PasswordInputField from '../form/PasswordInputField';
import { UnauthorizedError } from '@/network/http-errors';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginModalProps {
  onDismiss: () => void;
  onSignupInstead: () => void;
  onForgotPassword: () => void;
}

export default function LoginModal({ onDismiss, onSignupInstead, onForgotPassword }: LoginModalProps) {
  const { userMutate } = useAuthenticatedUser();

  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(credentials: LoginFormData) {
    try {
      setErrorText(null);
      const user = await UsersApi.login(credentials);
      // since we have the user, update the cache/SWR right away (a bit quicker than waiting for the SWR to update itself)
      userMutate(user);
      onDismiss();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText('Invalid username or password');
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
        <Modal.Title>Log In</Modal.Title>
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
          <PasswordInputField
            register={register('password')}
            label="Password"
            placeholder="Enter Password"
            error={errors.password}
          />
          <Button
            variant="link"
            className="d-block ms-auto mb-3"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </Button>
          <LoadingButton
            isLoading={isSubmitting}
            type="submit"
            className="w-100"
          >
            Log In
          </LoadingButton>
        </Form>

        <div className="d-flex align-items-center justify-content-center mt-2 gap-2">
          <span>Don&apos;t have an account? </span>
          <Button
            variant="link"
            className="p-0"
            onClick={onSignupInstead}
          >
            Sign Up
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
