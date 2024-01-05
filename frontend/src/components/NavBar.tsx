import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import Logo from '@/assets/images/logo-bn.svg';
import Image from 'next/image';
import styles from '@/styles/NavBar.module.css';
import { useState } from 'react';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';

export default function NavBar() {
  const router = useRouter();

  const { user } = useAuthenticatedUser();

  return (
    <Navbar
      variant="dark"
      expand="md"
      collapseOnSelect
      bg="body"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          href="/"
          className="d-flex align-items-center gap-2"
        >
          <Image
            src={Logo}
            alt="logo"
            width={40}
            height={40}
          />
          <span className={styles.brandText}>BlogNext</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link
              as={Link}
              href="/"
              active={router.pathname === '/'}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/blog"
              active={router.pathname === '/blog'}
            >
              Blog
            </Nav.Link>
          </Nav>
          {user ? <LoggedInView /> : <LoggedOutView />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function LoggedInView() {
  return (
    <Nav className="ms-auto">
      <Nav.Link
        className="d-flex align-items-center gap-1"
        as={Link}
        href="/blog/new-post"
      >
        <FiEdit />
        Create Post{' '}
      </Nav.Link>
    </Nav>
  );
}

function LoggedOutView() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <Nav className="ms-auto">
        <Button
          variant="outline-primary"
          onClick={() => setShowLoginModal(true)}
          className="mt-2 mt-md-0 ms-md-2"
        >
          Log In
        </Button>
        <Button
          variant="primary"
          onClick={() => setShowSignUpModal(true)}
          className="mt-2 mt-md-0 ms-md-2"
        >
          Sign Up
        </Button>
      </Nav>
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onSignupInstead={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
          onForgotPassword={() => {}}
        />
      )}
      {showSignUpModal && (
        <SignupModal
          onDismiss={() => setShowSignUpModal(false)}
          onLoginInstead={() => {
            setShowSignUpModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}
