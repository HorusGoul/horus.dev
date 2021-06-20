import { getMDXComponent } from 'mdx-bundler/client';
import NextImage, { ImageProps } from 'next/image';
import { useMemo } from 'react';
import 'prism-theme-night-owl';
import { getPostCardDetails, PostFrontmatter } from '@/utils/post';
import { Post } from '@prisma/client';
import { MdAttachFile } from 'react-icons/md';

declare global {
  interface PlausibleEvents {
    ['Share']: { post: string; type: string };
  }
}

const components = {
  img: function CustomImage({
    src,
    height,
    width,
    title,
    ...rest
  }: ImageProps) {
    if (!src) {
      return (
        <p className="border-red-500 p-4 border-4 bg-red-200">
          img without <code>`src`</code> property
        </p>
      );
    }

    return (
      <figure>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
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

const shareArticleSites = [
  {
    type: 'twitter',
    text: 'Twitter',
  },
  {
    type: 'linkedin',
    text: 'LinkedIn',
  },
  {
    type: 'reddit',
    text: 'Reddit',
  },
  {
    type: 'hackernews',
    text: 'Hacker News',
  },
  {
    type: 'facebook',
    text: 'Facebook',
  },
];

interface PostRendererProps {
  code: string;
  frontmatter: PostFrontmatter;
  post: Post;
}

function PostRenderer({ code, frontmatter, post }: PostRendererProps) {
  const MdxComponent = useMemo(() => getMDXComponent(code), [code]);

  const details = getPostCardDetails(post);

  function createShareLink(type: string) {
    const url = `https://horus.dev/blog/${post.slug}`;
    const text = `"${post.title}" by @HorusGoul ${url}`;

    switch (type) {
      case 'twitter': {
        return `https://twitter.com/intent/tweet?text=${text}`;
      }
      case 'linkedin': {
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
      }
      case 'reddit': {
        return `https://www.reddit.com/submit?url=${url}&title=${post.title}`;
      }
      case 'hackernews': {
        return `https://news.ycombinator.com/submitlink?u=${url}&t=${post.title}`;
      }
      case 'facebook': {
        return `https://www.facebook.com/sharer.php?u=${url}`;
      }
      case 'copy': {
        return url;
      }
    }
  }

  function createShareOnClick(type: string) {
    return () => {
      plausible('Share', {
        props: { type, post: post.slug },
      });
    };
  }

  function shareOrCopy() {
    const url = createShareLink('copy');

    if ('share' in navigator) {
      navigator.share({
        url,
        title: post.title,
      });
      plausible('Share', {
        props: { type: 'native-share', post: post.slug },
      });
    } else if ('clipboard' in navigator) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigator.clipboard.writeText(url);
      alert('URL Copied!');
      plausible('Share', {
        props: { type: 'copy-url', post: post.slug },
      });
    } else {
      prompt('Copy from the text input', url);
      plausible('Share', {
        props: { type: 'copy-url-prompt', post: post.slug },
      });
    }
  }

  return (
    <div className="mt-8 max-w-5xl mx-auto my-0">
      <article className="prose lg:prose-xl">
        <h1>{frontmatter.title}</h1>

        <blockquote>
          <div className="text-gray-900 not-italic">
            {frontmatter.description}
            <span className="ml-2 inline-flex gap-2 font-mono text-purple-400">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </span>
          </div>

          <div className="mt-2 text-gray-600">{details}</div>
        </blockquote>

        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <MdxComponent components={components} />

        <hr />
      </article>
      <div className="mt-4">
        <span className="text-sm uppercase font-bold text-gray-600">
          Share article
        </span>

        <ul className="flex flex-wrap gap-2 mt-2">
          <li>
            <button
              className="text-gray-800 font-bold p-1 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={shareOrCopy}
            >
              <MdAttachFile
                className="inline text-gray-600"
                aria-hidden="true"
              />{' '}
              <span>Share/Copy Link</span>
            </button>

            <span
              className="text-gray-500 font-extrabold  ml-0.5"
              aria-hidden="true"
            >
              ,
            </span>
          </li>

          {shareArticleSites.map((site, index) => (
            <li key={site.type}>
              <a
                href={createShareLink(site.type)}
                onClick={createShareOnClick(site.type)}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-gray-800 font-bold p-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                {site.text}
              </a>
              {index !== shareArticleSites.length - 1 && (
                <span
                  className="text-gray-500 font-extrabold ml-0.5"
                  aria-hidden="true"
                >
                  ,
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostRenderer;
