import { Modal } from 'react-bootstrap';

interface SignupModalProps {
  onHide: () => void;
  onLoginClicked: () => void;
}

export default function SignupModal({ onHide, onLoginClicked }: SignupModalProps) {
  return <Modal></Modal>;
}
