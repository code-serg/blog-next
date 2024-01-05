import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as UsersApi from '@/network/api/users';
import FormInputField from '../form/FormInputField';
import PasswordInputField from '../form/PasswordInputField';
import LoadingButton from '../LoadingButton';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  async function onSubmit(credentials: SignupFormData) {
    try {
      const newUser = await UsersApi.signup(credentials);
      alert(JSON.stringify(newUser));
    } catch (error) {
      console.error(error);
      alert(error);
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
