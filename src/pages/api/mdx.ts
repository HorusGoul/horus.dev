import { bundleMdx } from '@/mdx';
import { authGuard } from '@/utils/auth-guard';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      return res.status(401).send({});
    }

    await authGuard({ req });

    const result = await bundleMdx(req.body.source);

    res.status(200).send(result);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).send({ message: e.message });
    }

    return res.status(403).send({});
  }
}
