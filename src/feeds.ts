import { Feed } from 'feed';
import { META_BIO } from './pages/blog';
import prisma from './prisma';
import { PostFrontmatter } from './utils/post';

export async function createFeed() {
  const author = {
    name: 'Horus Lugo',
    email: 'hola@horus.dev',
    link: 'https://twitter.com/HorusGoul',
  };

  const feed = new Feed({
    id: 'https://horus.dev/',
    link: 'https://horus.dev/',
    title: `Feed for horus.dev`,
    description: META_BIO,
    language: 'en',
    image: `https://horus.dev/images/og/image.png`,
    favicon: `https://horus.dev/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Horus Lugo`,
    feedLinks: {
      json: 'https://horus.dev/json',
      atom: 'https://horus.dev/atom',
      rss: 'https://horus.dev/rss',
    },
    author,
  });

  feed.addCategory('Technology');
  feed.addCategory('Programming');
  feed.addCategory('Web Development');
  feed.addCategory('Software Development');

  const posts = await prisma.post.findMany({
    where: {
      publishedAt: {
        not: {
          equals: null,
          gt: new Date(),
        },
      },
    },
    orderBy: { publishedAt: 'desc' },
  });

  for (const post of posts) {
    const frontmatter = post.frontmatter as PostFrontmatter;

    feed.addItem({
      id: `https://horus.dev/blog/${post.slug}`,
      link: `https://horus.dev/blog/${post.slug}`,
      title: post.title,
      description: frontmatter.description ?? undefined,
      date: post.publishedAt ?? new Date(),
      author: [author],
      image:
        'https://horus.dev/api/og-image/blog/__post-og-image.png?id=' + post.id,
    });
  }

  return feed;
}
