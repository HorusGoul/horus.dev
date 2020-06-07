import Head from 'next/head';
import Social from '@/components/social';
import PostCard from '@/components/post-card';
import { BsArrowRight } from 'react-icons/bs';
import classNames from 'classnames';
import CodeTag from '@/components/code-tag';
import { theme } from '@/../tailwind.config.js';
import Container from '@/components/container';
import { GetStaticProps } from 'next';
import { Article, fetchArticles } from '@/model/article';
import ProjectCard from '@/components/project-card';

interface HomeProps {
  articles: Article[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articles = await fetchArticles('horusgoul');

  return {
    props: {
      articles,
    },
  };
};

export default function Home({ articles }: HomeProps) {
  return (
    <>
      <Head>
        <title>Horus Lugo</title>
      </Head>

      <Container>
        <div className="w-full md:flex md:items-center md:flex-row">
          <div className="inline-block text-left md:flex-1 md:block">
            <h2 className="font-medium text-3xl xsm:text-4xl md:text-6xl">
              Horus Lugo
            </h2>
            <h1 className="font-bold font-mono text-purple-600 text-xl xsm:text-2xl md:text-4xl">
              Web Engineer
            </h1>
          </div>

          <picture className="rounded-full overflow-hidden shadow-xl float-right w-20 xsm:w-32 md:float-none md:w-48 lg:w-64 ">
            <source
              media={`(min-width: ${theme.screens.lg})`}
              srcSet="/images/avatar/lg.jpg"
            />
            <source
              media={`(min-width: ${theme.screens.sm})`}
              srcSet="/images/avatar/sm.jpg"
            />
            <img src="/images/avatar/xsm.jpg" alt="My Avatar" />
          </picture>
        </div>

        <p className="text-gray-700 text-left text-sm leading-7 tracking-wider pt-4 xsm:pt-8 xsm:text-xl xsm:leading-8 md:text-2xl md:leading-10 md:pt-16">
          Currently creating amazing products at{' '}
          <a href="https://z1.digital" className="text-black hover:underline">
            Z1 Digital Studio
          </a>{' '}
          using modern tools such as, among others, <CodeTag>React</CodeTag>,{' '}
          <CodeTag>Node.js</CodeTag>, <CodeTag>GraphQL</CodeTag>, and{' '}
          <CodeTag>TypeScript</CodeTag>
        </p>

        <div className="pt-16 md:pt-24">
          <h3 className="font-light text-gray-800 text-xl xsm:text-2xl sm:text-3xl">
            Where to find me
          </h3>

          <Social className="pt-4 -mx-6 max-w-5xl sm:mx-0 md:pt-6" />
        </div>
      </Container>

      <Container>
        <h2 className="font-bold font-mono text-2xl xsm:text-3xl md:text-5xl">
          Latest articles
        </h2>

        <div className="py-4 p grid -mx-6 gap-4 xsm:gap-8 sm:mx-0 md:pt-6">
          {articles.map(({ id, url, title, details }) => (
            <PostCard key={id} href={url} title={title} details={details} />
          ))}

          <div className="flex justify-center">
            <a
              href="https://dev.to/horusgoul"
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
              <BsArrowRight className="text-3xl" />
            </a>
          </div>
        </div>
      </Container>

      <div className="relative">
        <div className="shape-divider">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66 92.83C906.67 72 823.78 31 743.84 14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84 11.73-114 31.07-172 41.86A600.21 600.21 0 010 27.35V120h1200V95.8c-67.81 23.12-144.29 15.51-214.34-2.97z"
              className="shape-fill"
            />
          </svg>
        </div>
      </div>

      <div className="bg-black pt-56 pb-12">
        <Container>
          <h2 className="font-bold font-mono text-white text-2xl xsm:text-3xl md:text-5xl">
            Showcase
          </h2>
        </Container>
      </div>

      <div className="bg-black py-8 p grid gap-4 xsm:gap-8">
        <ProjectCard
          title="Atom - Periodic Table & Tests"
          description="A Progressive Web App that has already helped more than 70.000 students across the world. It's main focus is to make it easier to learn some basic aspects of chemistry such as the Periodic Table."
          href="https://atom.horuslugo.com"
          sourceCodeHref="https://github.com/HorusGoul/atom-pwa"
          image="atom"
        />
      </div>
    </>
  );
}
