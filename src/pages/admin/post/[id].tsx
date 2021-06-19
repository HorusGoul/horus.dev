import { Post } from '.prisma/client';
import PostStatePill from '@/components/post-state-pill';
import prisma from '@/prisma';
import { authGuard } from '@/utils/auth-guard';
import { getPostState } from '@/utils/post';
import { createGetServerSideProps } from '@/utils/ssr';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { MdArrowBack, MdImage, MdOpenInNew } from 'react-icons/md';
import SubpageContainer from '@/components/subpage-container';
import MarkdownEditor from '@/components/markdown-editor';
import { PostEditorProvider } from '@/contexts/post-editor';
import { useAuth } from '@/utils/useAuth';
import { useState } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

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
    const title = `Untitled`;
    const slug = `untitled-${Date.now()}`;
    const description = `Lorem ipsum dolor.`;

    const post = await prisma.post.create({
      data: {
        slug,
        title,
        body: `---
title: ${title}
slug: ${slug}
description: ${description}
tags: []
publishedAt: null
ogImage: null
---
`,
      },
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

export default function PostEditor({ post: initialPost }: PostEditorProps) {
  useAuth();

  const [post, setPost] = useState(() => initialPost);
  const state = getPostState(post);

  return (
    <SubpageContainer>
      <Head>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <title>📝 {post.title}</title>
      </Head>

      <header className="p-4 flex items-center w-full">
        <Link href="/admin/dashboard">
          <a className="flex items-center p-2 bg-gray-400 text-gray-800 rounded-full hover:opacity-90 active:opacity-70">
            <MdArrowBack aria-label="Back" />
          </a>
        </Link>

        <span className="text-xl ml-4">Post Editor</span>

        <div className="ml-auto flex gap-2 items-center">
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a
            href={`https://og.horus.dev/blog/__post-og-image.png?id=${post.id}`}
            className="p-2 bg-gray-400 text-gray-800 rounded-full hover:opacity-90 active:opacity-70"
            target="_blank"
          >
            <MdImage aria-label="Open OG Image" className="h-4 w-auto" />
          </a>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a
            href={`/blog/${post.slug}`}
            className="p-2 bg-gray-400 text-gray-800 rounded-full hover:opacity-90 active:opacity-70"
            target="_blank"
          >
            <MdOpenInNew aria-label="Open post" className="h-4 w-auto" />
          </a>

          <PostStatePill state={state} />
        </div>
      </header>

      <PostEditorProvider post={post} setPost={setPost}>
        <MarkdownEditor />
      </PostEditorProvider>

      <Toaster />
    </SubpageContainer>
  );
}
