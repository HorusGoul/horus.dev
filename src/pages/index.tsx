import Head from 'next/head';
import Social from '@/components/social';
import PostCard from '@/components/post-card';
import { BsArrowRight } from 'react-icons/bs';
import classNames from 'classnames';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horus Lugo</title>
      </Head>

      <div className="container mx-auto py-12 px-8 md:px-12 md:py-24 lg:py-32">
        <div className="flex flex-col-reverse items-center w-full md:flex-row">
          <div className="pt-8 flex-1 text-center md:pt-0 md:text-left">
            <h2 className="font-medium text-4xl md:text-6xl">Horus Lugo</h2>
            <h1 className="font-bold font-mono text-purple-600 text-2xl md:text-4xl">
              Web Engineer
            </h1>
          </div>

          <picture className="w-48 rounded-full overflow-hidden shadow-xl md:w-64">
            <img src="/images/avatar/avatar.jpg" alt="My Avatar" />
          </picture>
        </div>

        <div className="pt-12 md:pt-32">
          <h3 className="font-bold font-mono text-2xl text-gray-800">
            Where to find me
          </h3>

          <Social className="pt-4 max-w-2xl md:pt-6 " />
        </div>
      </div>

      <div className="container mx-auto py-12 px-8 md:px-12 md:py-24 lg:py-32">
        <h2 className="font-bold font-mono text-3xl md:text-5xl">
          Latest articles
        </h2>

        <div className="py-4 md:pt-6 grid gap-8">
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
