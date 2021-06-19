import { createFeed } from '@/feeds';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await createFeed();

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.atom1());
  res.end();

  return { props: {} };
};

export default function Atom() {
  return null;
}
