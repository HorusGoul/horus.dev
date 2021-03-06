import Container from '@/components/container';
import Footer from '@/components/footer';
import Header from '@/components/header';
import PostCard from '@/components/post-card';
import SectionDivider from '@/components/section-divider';
import Social from '@/components/social';
import SubpageContainer from '@/components/subpage-container';
import prisma from '@/prisma';
import { getPostCardDetails } from '@/utils/post';
import { Post } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

interface BlogProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
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

  return { props: { posts }, revalidate: 60 };
};

export const META_TITLE = `Blog | Horus Lugo`;
export const META_BIO = `Here's where you can find my latest publications about my projects, tutorials, and stuff from various topics, focusing on web development.`;

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Head>
        <title>{META_TITLE} </title>
        <meta name="title" content={META_TITLE} />
        <meta name="description" content={META_BIO} />
        <link rel="canonical" href="https://horus.dev/blog" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horus.dev/blog" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_BIO} />
        <meta property="og:image" content="/images/og/image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://horus.dev/blog" />
        <meta property="twitter:title" content={META_TITLE} />
        <meta property="twitter:description" content={META_BIO} />
        <meta property="twitter:image" content="/images/og/image.png" />
      </Head>

      <Header
        title="Blog"
        goBackHref="/"
        description="Here's where you can find my latest publications about my projects, tutorials, and stuff from various topics, focusing on web development."
      />

      <SectionDivider backgroundColor="bg-gray-100" />

      <div className="bg-gray-100 py-20 grid gap-12">
        <SubpageContainer>
          <div className="py-4 p grid -mx-6 gap-4 xsm:gap-8 sm:mx-0">
            {posts.map((post) => {
              const details = getPostCardDetails(post);

              return (
                <PostCard
                  key={post.id}
                  title={post.title}
                  href={`/blog/${post.slug}`}
                  details={details}
                  heading="h2"
                />
              );
            })}
          </div>
        </SubpageContainer>
      </div>

      <SectionDivider reverse={true} backgroundColor="bg-gray-100" />

      <Container>
        <div className="pt-16 md:pt-24">
          <h3 className="font-light text-gray-800 text-xl xsm:text-2xl sm:text-3xl">
            Where to find me
          </h3>

          <Social className="pt-4 -mx-6 max-w-5xl sm:mx-0 md:pt-6" />
        </div>

        <Footer />
      </Container>
    </>
  );
}
