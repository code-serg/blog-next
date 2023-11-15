import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

// ButtonProps is a type from react-bootstrap - allows the function to accept additional props such as "variant" or "type"
export default function LoadingButton({ isLoading, children, ...props }: LoadingButtonProps & ButtonProps) {
  return (
    <Button {...props}>
      {isLoading && (
        <>
          <Spinner
            as="span"
            role="status"
            animation="border"
            size="sm"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>{' '}
        </>
      )}
      {children}
    </Button>
  );
}
