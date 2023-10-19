import '@/styles/globals.css';
import Head from 'next/head';

import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';

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

      <div className={inter.className}>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
