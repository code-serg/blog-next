import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Button, FormControlProps } from 'react-bootstrap';
import { ComponentProps, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormInputField from './FormInputField';

interface PasswordInputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

export default function PasswordInputField({
  register,
  label,
  error,
  ...props
}: PasswordInputFieldProps & FormControlProps & ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInputField
      register={register}
      label={label}
      error={error}
      {...props}
      type={showPassword ? 'text' : 'password'}
      maxLength={250}
      inputGroupElement={
        <Button
          variant="secondary"
          className="d-flex align-items-center"
          onClick={() => setShowPassword(!showPassword)}
          id={register.name + '-password-visibility-button'}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </Button>
      }
    />
  );
}
