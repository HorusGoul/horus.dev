import path from 'path';
import { bundleMDX as mdxBundler } from 'mdx-bundler';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import rehypeImageMetadata from '@/plugins/rehype-image-metadata';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import remarkUnwrapImages from 'remark-unwrap-images';

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe',
  );
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild',
  );
}

export type BundleMDXResult = Awaited<ReturnType<typeof mdxBundler>>;

export function bundleMdx(source: string): Promise<BundleMDXResult> {
  return mdxBundler(source, {
    cwd: path.resolve(process.cwd(), 'src/components'),

    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkUnwrapImages,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePrism,
        rehypeImageMetadata,
      ];

      return options;
    },
  });
}
