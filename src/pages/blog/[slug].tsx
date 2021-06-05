import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs/promises';
import path from 'path';
import { bundleMdx, BundleMDXResult } from '@/mdx';
import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Header from '@/components/header';
import 'prism-theme-night-owl';
import NextImage, { ImageProps } from 'next/image';

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

const components = {
  img: function CustomImage({
    src,
    height,
    width,
    title,
    ...rest
  }: ImageProps) {
    return (
      <figure>
        <NextImage
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          layout="responsive"
          src={src}
          height={height}
          width={width}
          {...rest}
        />

        {title && <figcaption>{title}</figcaption>}
      </figure>
    );
  },
};

export default function Post({ code, frontmatter }: PostProps) {
  const MdxComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div>
      <Header title="blog" goBackHref="/blog" />

      <article className="mt-8 prose lg:prose-xl max-w-5xl mx-auto my-0">
        <h1>{frontmatter.title}</h1>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <MdxComponent components={components} />
      </article>
    </div>
  );
}
