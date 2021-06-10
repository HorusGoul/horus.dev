import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs/promises';
import path from 'path';
import { bundleMdx, BundleMDXResult } from '@/mdx';
import React from 'react';
import Header from '@/components/header';
import PostRenderer from '@/components/post-renderer';

interface PostProps extends BundleMDXResult {
  slug: string;
}

interface PostQueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps<
  PostProps,
  PostQueryParams
> = async (context) => {
  const slug = context.params?.slug ?? '';

  const content = await fs.readFile(
    path.resolve(process.cwd(), 'src/pages/blog', 'example.mdx'),
    'utf8',
  );

  const bundleMdxResult = await bundleMdx(content);

  return {
    props: {
      slug,
      ...bundleMdxResult,
    },
  };
};

export default function Post({ code, frontmatter }: PostProps) {
  return (
    <div>
      <Header title="blog" goBackHref="/blog" />

      <PostRenderer code={code} frontmatter={frontmatter} />
    </div>
  );
}
