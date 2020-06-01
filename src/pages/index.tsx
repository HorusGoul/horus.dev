import Head from 'next/head';
import Social from '@/components/social';
import PostCard from '@/components/post-card';
import { BsArrowRight } from 'react-icons/bs';
import classNames from 'classnames';
import CodeTag from '@/components/code-tag';
import { theme } from '@/../tailwind.config.js';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horus Lugo</title>
      </Head>

      <div className="container mx-auto py-12 px-6 xsm:px-8 md:px-12 md:py-24 lg:py-32">
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

        <div className="pt-12 md:pt-64">
          <h3 className="font-bold font-mono text-gray-800 text-xl xsm:text-2xl ">
            Where to find me
          </h3>

          <Social className="pt-4 max-w-2xl md:pt-6 " />
        </div>
      </div>

      <div className="container mx-auto py-12 px-6 xsm:px-8 md:px-12 md:py-24 lg:py-32">
        <h2 className="font-bold font-mono text-2xl xsm:text-3xl md:text-5xl">
          Latest articles
        </h2>

        <div className="py-4 p grid -mx-6 gap-4 xsm:gap-8 sm:mx-0 md:pt-6">
          <PostCard
            href="https://dev.to/horusgoul/using-html-css-and-javascript-to-create-obs-plugins-for-your-live-streaming-sessions-45ij"
            title="Using HTML, CSS, and JavaScript to Create OBS Plugins for Your Live Streaming Sessions"
            details="April 11th, 2020 · 2 min read"
          />
          <PostCard
            href="https://dev.to/horusgoul/using-html-css-and-javascript-to-create-obs-plugins-for-your-live-streaming-sessions-45ij"
            title="Using HTML, CSS, and JavaScript to Create OBS Plugins for Your Live Streaming Sessions"
            details="April 11th, 2020 · 2 min read"
          />
          <PostCard
            href="https://dev.to/horusgoul/using-html-css-and-javascript-to-create-obs-plugins-for-your-live-streaming-sessions-45ij"
            title="Using HTML, CSS, and JavaScript to Create OBS Plugins for Your Live Streaming Sessions"
            details="April 11th, 2020 · 2 min read"
          />

          <div className="flex justify-center">
            <a
              href="https://dev.to/horusgoul"
              className={classNames(
                'flex items-center bg-black rounded-full px-8 py-2 shadow-none',
                'text-white text-center text-lg font-bold',
                'cursor-pointer select-none',
                'transition-all duration-200 ease-linear',
                'hover:shadow-xl hover:bg-gray-800 hover:text-gray-100',
                'focus:shadow-xl focus:bg-gray-800 focus:text-gray-100',
              )}
            >
              <span className="pr-4">More articles</span>{' '}
              <BsArrowRight className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
