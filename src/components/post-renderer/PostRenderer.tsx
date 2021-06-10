import { getMDXComponent } from 'mdx-bundler/client';
import NextImage, { ImageProps } from 'next/image';
import { useMemo } from 'react';
import 'prism-theme-night-owl';

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

interface PostRendererProps {
  code: string;
  frontmatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

function PostRenderer({ code, frontmatter }: PostRendererProps) {
  const MdxComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article className="mt-8 prose lg:prose-xl max-w-5xl mx-auto my-0">
      <h1>{frontmatter.title}</h1>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <MdxComponent components={components} />
    </article>
  );
}

export default PostRenderer;
