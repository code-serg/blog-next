import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Container, SSRProvider } from 'react-bootstrap';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import NextNProgress from 'nextjs-progressbar';
import SignupModal from '@/components/auth/SignupModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss';
import '@/styles/utils.css';
import styles from '@/styles/App.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
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

      <SSRProvider>
        <div className={inter.className}>
          <NextNProgress color="var(--bs-primary)" />
          <NavBar />
          <main>
            <Container className={styles.pageContainer}>
              <Component {...pageProps} />
            </Container>
          </main>
          <Footer />
          <SignupModal
            onHide={() => {}}
            onLoginClicked={() => {}}
          />
        </div>
      </SSRProvider>
    </>
  );
}
