import { ParsedUrlQuery } from 'querystring';
import { bundleMdx } from '@/mdx';
import React from 'react';
import Header from '@/components/header';
import PostRenderer from '@/components/post-renderer';
import { getPostState, PostFrontmatter } from '@/utils/post';
import Head from 'next/head';
import prisma from '@/prisma';
import { authGuard } from '@/utils/auth-guard';
import { createGetServerSideProps, RedirectResult } from '@/utils/ssr';
import MiniHeader from '@/components/mini-header';
import SubpageContainer from '@/components/subpage-container';

interface PostProps {
  slug: string;
  code: string;
  frontmatter: PostFrontmatter;
}

interface PostQueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps = createGetServerSideProps<
  PostProps,
  PostQueryParams
>(async (context) => {
  const slug = context.params?.slug ?? '';

  const post = await prisma.post.findFirst({
    where: { slug },
    orderBy: { publishedAt: 'desc' },
  });

  if (!post) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }

  const state = getPostState(post);

  if (state !== 'published') {
    await authGuard(context).catch(() => {
      throw new RedirectResult({
        destination: '/blog',
        permanent: false,
      });
    });
  }

  const bundleMdxResult = await bundleMdx(post.body);

  return {
    props: {
      slug,
      ...bundleMdxResult,
    },
  };
});

export default function Post({ code, frontmatter }: PostProps) {
  const title = frontmatter.title ?? '';
  const slug = frontmatter.slug ?? '';
  const ogImage = frontmatter.ogImage ?? '/images/og/image.png';
  const description = frontmatter.description ?? '';

  return (
    <div>
      <Head>
        <title>{title}</title>

        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://horus.dev/blog/${slug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://horus.dev/blog/${slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://horus.dev/blog/${slug}`}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
      </Head>

      <SubpageContainer>
        <MiniHeader />

        <PostRenderer code={code} frontmatter={frontmatter} />
      </SubpageContainer>
    </div>
  );
}
