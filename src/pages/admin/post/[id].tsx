import { Post } from '.prisma/client';
import PostStatePill from '@/components/post-state-pill';
import prisma from '@/prisma';
import { authGuard } from '@/utils/auth-guard';
import { getPostState } from '@/utils/post';
import { createGetServerSideProps } from '@/utils/ssr';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { MdArrowBack } from 'react-icons/md';

interface PostEditorParams extends ParsedUrlQuery {
  id: string;
}

interface PostEditorProps {
  post: Post;
}

export const getServerSideProps = createGetServerSideProps<
  PostEditorProps,
  PostEditorParams
>(async (context) => {
  await authGuard(context);
  const id = context.params?.id;

  if (id === 'new') {
    const post = await prisma.post.create({
      data: { slug: `untitled-${Date.now()}` },
    });

    return {
      redirect: {
        destination: `/admin/post/${post.id}`,
        permanent: false,
      },
    };
  }

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
});

export default function PostEditor({ post }: PostEditorProps) {
  const state = getPostState(post);

  return (
    <div className="flex flex-col max-w-5xl w-full my-0 mx-auto">
      <header className="p-4 flex items-center w-full">
        <Link href="/admin/dashboard">
          <a className="flex items-center px-4 py-2 bg-gray-400 text-gray-800 font-semibold rounded-full hover:opacity-90 active:opacity-70">
            <MdArrowBack />

            <span className="ml-2">Back</span>
          </a>
        </Link>

        <span className="text-2xl ml-4">Post Editor</span>

        <div className="ml-auto">
          <PostStatePill state={state} />
        </div>
      </header>
    </div>
  );
}
