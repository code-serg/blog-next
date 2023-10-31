import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar() {
  const router = useRouter();

  return (
    <Navbar
      variant="dark"
      expand="md"
      collapseOnSelect
      bg="body"
      sticky="top"
    >
      <Container>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
