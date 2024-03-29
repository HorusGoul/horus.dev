import Head from 'next/head';
import Social from '@/components/social';
import PostCard from '@/components/post-card';
import { BsArrowRight } from 'react-icons/bs';
import classNames from 'classnames';
import CodeTag from '@/components/code-tag';
import { theme } from '@/../tailwind.config.js';
import Container from '@/components/container';
import { GetStaticProps } from 'next';
import ProjectCard from '@/components/project-card';
import SectionDivider from '@/components/section-divider';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Post } from '@prisma/client';
import prisma from '@/prisma';
import { getPostCardDetails } from '@/utils/post';

interface HomeProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
    take: 3,
  });

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

const META_TITLE = `Horus Lugo — Full Stack Engineer`;
const META_BIO = `Building software for fun since 2008 to create websites, apps, games, or whatever I find interesting at the moment. React, Node.js, GraphQL, and TypeScript are part of my preferred stack for developing Full Stack projects.`;

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="title" content={META_TITLE} />
        <meta name="description" content={META_BIO} />
        <link rel="canonical" href="https://horus.dev" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horus.dev" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_BIO} />
        <meta property="og:image" content="/images/og/image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://horus.dev" />
        <meta property="twitter:title" content={META_TITLE} />
        <meta property="twitter:description" content={META_BIO} />
        <meta property="twitter:image" content="/images/og/image.png" />
      </Head>

      <Container>
        <div className="w-full md:flex md:items-center md:flex-row">
          <div className="inline-block text-left md:flex-1 md:block">
            <h1 className="font-medium text-3xl xsm:text-4xl md:text-6xl">
              Horus Lugo
            </h1>
            <span className="font-bold font-mono w-40 text-purple-600 text-2xl sm:w-auto md:text-4xl">
              Full Stack Engineer
            </span>
          </div>

          <picture className="rounded-full overflow-hidden shadow-xl float-right h-20 w-20 xsm:w-32 xsm:h-32 md:float-none md:w-48 md:h-48 lg:w-64 lg:h-64 ">
            <source
              media={`(min-width: ${theme.screens.lg})`}
              srcSet="/images/avatar/lg.jpg"
            />
            <source
              media={`(min-width: ${theme.screens.sm})`}
              srcSet="/images/avatar/sm.jpg"
            />
            <source
              media={`(min-width: ${theme.screens.xsm})`}
              srcSet="/images/avatar/xsm.jpg"
            />

            <img
              src="/images/avatar/xxsm.jpg"
              alt="My Avatar"
              className="w-full h-full"
            />
          </picture>
        </div>

        <p className="text-gray-700 text-left text-sm leading-7 tracking-wider pt-4 xsm:pt-8 xsm:text-xl xsm:leading-8 md:text-2xl md:leading-10 md:pt-16">
          Building software for fun since 2008 to create websites, apps, games,
          or whatever I find interesting at the moment. <CodeTag>React</CodeTag>
          , <CodeTag>Node.js</CodeTag>, <CodeTag>GraphQL</CodeTag>, and{' '}
          <CodeTag>TypeScript</CodeTag> are part of my preferred stack for
          developing Full Stack projects.
        </p>

        <div className="pt-16 md:pt-24">
          <h2 className="font-light text-gray-800 text-xl xsm:text-2xl sm:text-3xl">
            Where to find me
          </h2>

          <Social className="pt-4 -mx-6 max-w-5xl sm:mx-0 md:pt-6" />
        </div>
      </Container>

      <Container>
        <h2 className="font-bold font-mono text-2xl xsm:text-3xl md:text-5xl">
          Latest articles
        </h2>

        <div className="py-4 p grid -mx-6 gap-4 xsm:gap-8 sm:mx-0 md:pt-6">
          {posts.map(({ id, slug, title, ...post }) => (
            <PostCard
              key={id}
              href={`/blog/${slug}`}
              title={title}
              details={getPostCardDetails(post)}
            />
          ))}

          <div className="flex justify-center">
            <Link href="/blog">
              <a
                className={classNames(
                  'flex items-center bg-black rounded-full px-8 py-2 shadow-none',
                  'text-white text-center text-lg font-bold',
                  'cursor-pointer select-none',
                  'transition-color-shadow duration-200 ease-linear',
                  'hover:shadow-xl hover:bg-gray-800 hover:text-gray-100',
                  'focus:shadow-xl focus:bg-gray-800 focus:text-gray-100',
                )}
              >
                <span className="pr-4">More articles</span>{' '}
                <BsArrowRight className="text-3xl" aria-hidden="true" />
              </a>
            </Link>
          </div>
        </div>
      </Container>

      <SectionDivider />

      <div className="bg-black pb-4 pt-20 md:pt-56">
        <Container>
          <h2 className="font-bold font-mono text-white text-2xl xsm:text-3xl md:text-5xl">
            Showcase
          </h2>
        </Container>
      </div>

      <div className="bg-black pt-8 pb-32 grid gap-12">
        <ProjectCard
          title="Atom - Periodic Table & Tests"
          description="A Progressive Web App that has already helped more than 70.000 students across the world. It's main focus is to make it easier to learn some basic aspects of chemistry such as the Periodic Table."
          href="https://atom.horuslugo.com"
          sourceCodeHref="https://github.com/HorusGoul/atom-pwa"
          image="atom"
        />
      </div>

      <SectionDivider reverse={true} />

      <Container>
        <Footer />
      </Container>
    </>
  );
}
