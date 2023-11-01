import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import Logo from '@/assets/images/logo-bn.svg';
import Image from 'next/image';
import styles from '@/styles/NavBar.module.css';

export default function NavBar() {
  const router = useRouter();

  return (
    <Navbar variant="dark" expand="md" collapseOnSelect bg="body" sticky="top">
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2">
          <Image src={Logo} alt="logo" width={40} height={40} />
          <span className={styles.brandText}>BlogNext</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/" active={router.pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/blog" active={router.pathname === '/blog'}>
              Blog
            </Nav.Link>
          </Nav>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
