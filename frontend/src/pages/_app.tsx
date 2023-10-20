import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Container, SSRProvider } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SSRProvider>
        <div className={inter.className}>
          <main>
            <Container className={styles.pageContainer}>
              <Component {...pageProps} />
            </Container>
          </main>
        </div>
      </SSRProvider>
    </>
  );
}
