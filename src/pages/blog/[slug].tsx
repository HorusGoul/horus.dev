import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs/promises';
import path from 'path';
import { bundleMdx, BundleMDXResult } from '@/mdx';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Header from '@/components/header';

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
  const MdxComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div>
      <Header goBackHref="/blog" />

      <article className="mt-8 prose lg:prose-xl max-w-5xl mx-auto my-0">
        <h1>{frontmatter.title}</h1>
        <MdxComponent />

        <pre>
          <code>asdasd</code>
        </pre>
      </article>
    </div>
  );
}
