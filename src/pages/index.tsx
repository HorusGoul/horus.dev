import Head from 'next/head';
import Social from '@/components/social';

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
          <h2 className="font-medium text-2xl md:text-3xl text-gray-800">
            Where to find me{' '}
          </h2>

          <Social className="pt-4 md:pt-6" />
        </div>
      </div>
    </>
  );
}
