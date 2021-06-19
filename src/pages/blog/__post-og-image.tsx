import prisma from '@/prisma';
import { PostFrontmatter, getPostCardDetails } from '@/utils/post';
import { createGetServerSideProps } from '@/utils/ssr';
import { Post } from '@prisma/client';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import { RiTwitterFill } from 'react-icons/ri';
import Head from 'next/head';

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
  const id = (context.query?.id as string) ?? '';

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }

  const frontmatter = post.frontmatter as PostFrontmatter;

  return {
    props: {
      slug: id,
      post,
      frontmatter,
    },
  };
});

export default function PostOgImage({ post, frontmatter }: PostPageProps) {
  const title = post.title;
  const ogImage = frontmatter.ogImage;
  const description = frontmatter.description ?? '';

  const details = getPostCardDetails(post);

  let titleFontSize = '7rem';

  switch (true) {
    case title.length > 50:
      titleFontSize = '5.5rem';
      break;
    case title.length > 80:
      titleFontSize = '4.5rem';
      break;
    case title.length > 100:
      titleFontSize = '3.5rem';
      break;
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900"
          rel="stylesheet"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <div
        style={{
          backgroundImage: ogImage ? `url(${ogImage})` : undefined,
          fontFamily: `"Fira Sans"`,
        }}
        className="w-screen h-screen bg-gray-900 p-24 bg-cover bg-center"
      >
        <div className="bg-black bg-opacity-10 h-full w-full absolute top-0 left-0 z-0" />
        <div
          className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-12 h-full shadow-2xl z-10 relative flex flex-col overflow-hidden"
          style={{
            borderRadius: '4rem',
          }}
        >
          <div className="bg-white p-12" style={{ borderRadius: '3rem' }}>
            <h1
              className="font-bold tracking-tight leading-tight"
              style={{ fontSize: titleFontSize }}
            >
              {title}
            </h1>

            <p
              className="py-8 text-gray-700 tracking-tight leading-snug"
              style={{ fontSize: '4rem' }}
            >
              {description}
            </p>
            <p className="text-5xl text-gray-600 text-right">{details}</p>
          </div>

          <div className="mt-auto flex items-center justify-end gap-8">
            <div className="flex items-center bg-white text-black p-4 pr-10 rounded-full">
              <div className="rounded-full overflow-hidden shadow-lg h-24 w-24 mr-6 bg-blue-500 text-white flex items-center justify-center">
                <RiTwitterFill className="h-16 w-16" />
              </div>

              <span className="text-5xl font-medium">@HorusGoul</span>
            </div>

            <div className="flex items-center bg-white text-black p-4 pr-10 rounded-full">
              <div className="rounded-full overflow-hidden shadow-lg h-24 w-24 mr-6 ">
                <img
                  src="/images/avatar/lg.jpg"
                  aria-hidden="true"
                  alt="My Avatar"
                  width={96}
                  height={96}
                />
              </div>

              <span className="text-5xl font-medium">
                horus.dev<span className="text-gray-600">/blog</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
