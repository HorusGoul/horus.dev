import AWS from 'aws-sdk';

export function createS3Client(): AWS.S3 {
  const endpoint = getEndpoint();

  return new AWS.S3({
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.APP_AWS_REGION,
    signatureVersion: 'v4',
    endpoint,
    s3ForcePathStyle: !!endpoint,
  });
}

interface AWSGetSignedURLParams {
  Bucket: string;
  Key: string;
  Expires?: number;
  ContentType?: string;
  ACL?: string;
  CacheControl?: string;
  Metadata?: Record<string, unknown>;
}

export async function createUploadSignedUrl(
  key: string,
  contentType: string,
): Promise<string> {
  const s3 = createS3Client();

  const params: AWSGetSignedURLParams = {
    Bucket: getBucket(),
    Key: key,
    ContentType: contentType,
    Expires: 60 * 60,
    ACL: 'public-read',
    CacheControl: 'public, max-age=604800',
  };

  const endpoint = getEndpoint();

  if (endpoint) {
    // In local we shouldn't use ACL because it will block our requests
    // with a 403 forbidden error (minio doesn't support ACL)
    delete params.ACL;
  }

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

  return uploadUrl;
}

export function getBucket() {
  return process.env.APP_AWS_S3_BUCKET || '';
}

export function getEndpoint() {
  return process.env.APP_AWS_S3_ENDPOINT;
}

export function getFileUrlFromId(id: string): string {
  const bucket = getBucket();
  const endpoint = getEndpoint();

  if (endpoint) {
    return `${endpoint}/${bucket}/${id}`;
  }

  return `https://${bucket}.s3.amazonaws.com/${id}`;
}
