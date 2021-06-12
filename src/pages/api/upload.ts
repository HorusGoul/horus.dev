import { apiAuthGuard } from '@/utils/auth-guard';
import { createUploadSignedUrl, getFileUrlFromId } from '@/utils/s3';
import { createApiHandler } from '@/utils/ssr';
import { randomUUID } from 'crypto';

export default createApiHandler(async (req, res) => {
  if (req.method !== 'POST' || !req.body.contentType) {
    res.status(400).send({});
    return;
  }

  await apiAuthGuard(req, res);

  const uuid = randomUUID();
  const uploadUrl = await createUploadSignedUrl(uuid, req.body.contentType);

  res.status(200).send({ uploadUrl, url: getFileUrlFromId(uuid) });
});
