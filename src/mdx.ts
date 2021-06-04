import path from 'path';
import { bundleMDX as mdxBundler } from 'mdx-bundler';

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
  });
}
