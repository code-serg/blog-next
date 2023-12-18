import { Form, Modal } from 'react-bootstrap';
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
            label="Username"
            register={register('username')}
            placeholder="Enter Username"
            maxLength={50}
            error={errors.username}
          />
          <FormInputField
            label="Email"
            type="email"
            register={register('email')}
            placeholder="Enter Email"
            maxLength={254}
            error={errors.email}
          />
          <PasswordInputField
            label="Password"
            register={register('password')}
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
      </Modal.Body>
    </Modal>
  );
}
