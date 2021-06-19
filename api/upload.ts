import { apiAuthGuard } from '../src/utils/auth-guard';
import { createUploadSignedUrl, getFileUrlFromId } from '../src/utils/s3';
import { createApiHandler } from '../src/utils/ssr';
import { v4 as uuid } from 'uuid';

export default createApiHandler(async (req, res) => {
  if (req.method !== 'POST' || !req.body.contentType) {
    res.status(400).send({});
    return;
  }

  await apiAuthGuard(req, res);

  const id = uuid();
  const uploadUrl = await createUploadSignedUrl(id, req.body.contentType);

  res.status(200).send({ uploadUrl, url: getFileUrlFromId(id) });
});
