// Similiar structure to:
// https://github.com/JS-DevTools/rehype-inline-svg/blob/master/src/inline-svg.ts
import imageSize from 'image-size';
import path from 'path';
import { Processor } from 'unified';
import { Node } from 'unist';
import visit from 'unist-util-visit';
import { promisify } from 'util';
import https from 'https';
import http from 'http';
import prisma from '@/prisma';

const sizeOf = promisify(imageSize);

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Node {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    height?: number;
    width?: number;
  };
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  );
}

const localCache: Record<string, { width: number; height: number }> = {};

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const src = node.properties.src;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any = localCache[src] || null;

  if (!res) {
    res = await prisma.imageMetadata.findUnique({ where: { url: src } });
  }

  if (res) {
    node.properties.width = res.width;
    node.properties.height = res.height;
    return;
  }

  if (node.properties.src.startsWith('/')) {
    res = await sizeOf(path.join(process.cwd(), 'public', src));
  } else {
    const options = new URL(src);

    res = await new Promise((resolve, reject) => {
      const protocol = options.protocol.includes('https') ? https : http;

      protocol.get(options, (response) => {
        const chunks: Uint8Array[] = [];

        response.on('data', (chunk) => chunks.push(chunk));

        response.on('end', () => {
          const buffer = Buffer.concat(chunks);

          resolve(imageSize(buffer));
        });

        response.on('error', reject);
      });
    });

    if (res) {
      await prisma.imageMetadata.create({
        data: { url: src, height: res.height, width: res.width },
      });
    }
  }

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  localCache[src] = { width: res.width, height: res.height };

  node.properties.width = res.width;
  node.properties.height = res.height;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export default function imageMetadata(this: Processor) {
  return async function transformer(tree: Node): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      if (node.properties.src === '') {
        continue;
      }

      await addMetadata(node);
    }

    return tree;
  };
}
