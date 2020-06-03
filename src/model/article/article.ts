import readingTime from 'reading-time';
import { DEVArticle, DEVFullArticle } from '@/api.types';

export interface Article extends Pick<DEVArticle, 'id' | 'url' | 'title'> {
  details: string;
}

export function createArticle(article: DEVFullArticle): Article {
  const date = new Date(article.published_at);

  const isFromThisYear = date.getFullYear() === new Date().getFullYear();

  const readtime = readingTime(article.body_markdown, {
    wordsPerMinute: 275,
  });

  const dateWithFormat = Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: isFromThisYear ? undefined : 'numeric',
  }).format(date);

  return {
    id: article.id,
    title: article.title,
    url: article.url,
    details: `${dateWithFormat} · ${readtime.text}`,
  };
}
