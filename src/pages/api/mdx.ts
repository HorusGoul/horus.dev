import { bundleMdx } from '@/mdx';
import { apiAuthGuard } from '@/utils/auth-guard';
import { createApiHandler } from '@/utils/ssr';

export default createApiHandler(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(401).send({});
  }

  await apiAuthGuard(req, res);

  const result = await bundleMdx(req.body.source);

  res.status(200).send(result);
});
