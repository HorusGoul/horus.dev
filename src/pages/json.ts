import { createFeed } from '@/feeds';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await createFeed();

  res.setHeader('Content-Type', 'application/json');
  res.write(feed.json1());
  res.end();

  return { props: {} };
};

export default function Json() {
  return null;
}
