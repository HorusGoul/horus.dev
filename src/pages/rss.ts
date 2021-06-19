import { createFeed } from '@/feeds';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await createFeed();

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.rss2());
  res.end();

  return { props: {} };
};

export default function Rss() {
  return null;
}
