import { bundleMdx } from '../src/mdx';
import prisma from '../src/prisma';
import { apiAuthGuard } from '../src/utils/auth-guard';
import { PostFrontmatter } from '../src/utils/post';
import { createApiHandler } from '../src/utils/ssr';
import superjson from 'superjson';

export default createApiHandler(async (req, res) => {
  if (req.method !== 'POST' || !req.body.id) {
    return res.status(401).send({});
  }

  await apiAuthGuard(req, res);

  const result = await bundleMdx(req.body.body);

  const frontmatter: PostFrontmatter = result.frontmatter;

  const id = req.body.id;

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      body: req.body.body,
      code: result.code,
      title: frontmatter.title ?? 'Untitled',
      frontmatter: result.frontmatter,
      slug: frontmatter.slug ?? undefined,
      publishedAt: frontmatter.publishedAt
        ? new Date(frontmatter.publishedAt)
        : null,
      tags: frontmatter.tags ?? [],
    },
  });

  res.status(200).send(superjson.stringify(updatedPost));
});
