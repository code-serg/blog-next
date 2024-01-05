import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import Logo from '@/assets/images/logo-bn.svg';
import Image from 'next/image';
import styles from '@/styles/NavBar.module.css';

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
  return (
    <Nav className="ms-auto">
      <Nav.Link
        as={Link}
        href="/login"
      >
        Login
      </Nav.Link>
      <Nav.Link
        as={Link}
        href="/register"
      >
        Register
      </Nav.Link>
    </Nav>
  );
}
