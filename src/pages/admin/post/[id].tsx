import { Post } from '.prisma/client';
import prisma from '@/prisma';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface PostEditorParams extends ParsedUrlQuery {
  id: string;
}

interface PostEditorProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<
  PostEditorProps,
  PostEditorParams
> = async (context) => {
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
};

export default function PostEditor({ post }: PostEditorProps) {
  return (
    <>
      <pre>
        <code>{JSON.stringify(post, null, 2)}</code>
      </pre>
    </>
  );
}
