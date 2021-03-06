import readingTime from 'reading-time';

export interface PostFrontmatter {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  tags?: string[];
  publishedAt?: string | null;
  ogImage?: string | null;
}

export type PostState = 'draft' | 'published' | 'scheduled';

export function getPostState(
  input: Date | null | { publishedAt: Date | null },
): PostState {
  const date =
    input instanceof Date || input === null ? input : input.publishedAt;

  let state: PostState;

  if (date) {
    if (date.getTime() <= Date.now()) {
      state = 'published';
    } else {
      state = 'scheduled';
    }
  } else {
    state = 'draft';
  }

  return state;
}

export function postDateFormat(date?: Date | null): string | null {
  if (!date) {
    return null;
  }

  const isFromThisYear = date.getFullYear() === new Date().getFullYear();

  const dateWithFormat = Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: isFromThisYear ? undefined : 'numeric',
  }).format(date);

  return dateWithFormat;
}

export function getPostCardDetails(post: {
  body: string;
  publishedAt: Date | null;
}) {
  const readtime = readingTime(post.body, {
    wordsPerMinute: 275,
  });

  const date = postDateFormat(post.publishedAt) ?? 'TBD';

  return `${date} · ${readtime.text}`;
}
