import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs/promises';
import path from 'path';
import { bundleMdx, BundleMDXResult } from '@/mdx';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

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

export default function Post({ slug, code, frontmatter }: PostProps) {
  const MdxComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      Post {slug}
      <h1>{frontmatter.title}</h1>
      <div>
        <MdxComponent
          components={{
            p: function Paragraph(c) {
              return <p className="text-red-700" {...c} />;
            },
          }}
        />
      </div>
    </>
  );
}
