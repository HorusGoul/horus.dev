import { NextApiHandler } from 'next';
import { createHandler } from 'next-og-image';

const handler = createHandler();

const ogImageHandler: NextApiHandler = (req, res) => {
  const url = new URL(req.url ?? '/', 'https://localhost:3000');
  req.query.path = url.pathname.replace('/api/og-image/', '').split('/');

  return handler(req, res);
};

export default ogImageHandler;
