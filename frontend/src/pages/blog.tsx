import Head from 'next/head';
import { Button } from 'react-bootstrap';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Articles - Blog</title>
        <meta
          name="description"
          content="Full Stack Blog with MERN + Next.js"
        />
      </Head>
      <div>
        <div>Hello New Blog!</div>
        <div>
          <Button>Click Here!</Button> HI{' '}
        </div>
        <div>
          <a href="#">Follow the Link</a>
        </div>
        <div> Hello </div>
      </div>
    </>
  );
}
