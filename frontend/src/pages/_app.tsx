import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Container, SSRProvider } from 'react-bootstrap';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import NextNProgress from 'nextjs-progressbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss';
import '@/styles/utils.css';
import styles from '@/styles/App.module.css';

import { useEffect, useState } from 'react';
import { User } from '@/models/user';
import * as UsersApi from '@/network/api/users';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  // temporary user state while in development - will be replaced
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await UsersApi.getAuthenticatedUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>Blog - Next</title>
        <meta
          name="description"
          content="Full Stack Blog with MERN + Next.js"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className={inter.className}>
        <NextNProgress color="var(--bs-primary)" />
        <NavBar />
        <div>{user?.username}</div>
        <main>
          <Container className={styles.pageContainer}>
            <Component {...pageProps} />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
