import { Modal } from 'react-bootstrap';

interface SignupModalProps {
  onDismiss: () => void;
  onLoginInstead: () => void;
}

export default function SignupModal({ onDismiss, onLoginInstead }: SignupModalProps) {
  return (
    <Modal
      show
      onHide={onDismiss}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}
