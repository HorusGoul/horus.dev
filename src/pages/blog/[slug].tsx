import { ParsedUrlQuery } from 'querystring';
import PostRenderer from '@/components/post-renderer';
import { getPostState, PostFrontmatter } from '@/utils/post';
import Head from 'next/head';
import prisma from '@/prisma';
import { authGuard } from '@/utils/auth-guard';
import { createGetServerSideProps, RedirectResult } from '@/utils/ssr';
import MiniHeader from '@/components/mini-header';
import SubpageContainer from '@/components/subpage-container';
import { Post } from '.prisma/client';
import Footer from '@/components/footer';
import React from 'react';
import Social from '@/components/social';

interface PostPageProps {
  slug: string;
  frontmatter: PostFrontmatter;
  post: Post;
}

interface PostPageQueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps = createGetServerSideProps<
  PostPageProps,
  PostPageQueryParams
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

  const frontmatter = post.frontmatter as PostFrontmatter;

  return {
    props: {
      slug,
      post,
      frontmatter,
    },
  };
});

export default function PostPage({ frontmatter, post }: PostPageProps) {
  const title = `${post.title} | Horus Lugo `;
  const slug = post.slug;
  const ogImage = 'https://og.horus.dev/blog/__post-og-image.png?id=' + post.id;
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

        <PostRenderer post={post} code={post.code} frontmatter={frontmatter} />

        <div className="max-w-5xl mx-auto my-0 pt-16 pb-12">
          <h2 className="font-light text-gray-800 text-xl xsm:text-2xl sm:text-3xl">
            Where to find me
          </h2>

          <Social className="pt-4 -mx-6 max-w-5xl sm:mx-0 md:pt-6" />

          <Footer />
        </div>
      </SubpageContainer>
    </div>
  );
}
