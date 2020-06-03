import { DEVArticle, DEVFullArticle } from '@/api.types';
import { createArticle, Article } from './article';

export async function fetchArticles(
  username: string,
  limit = 3,
): Promise<Article[]> {
  const response = await fetch(
    `https://dev.to/api/articles?username=${username}&per_page=${limit}`,
  );
  const devArticles: DEVArticle[] = await response.json();

  const fullDevArticles: DEVFullArticle[] = await Promise.all(
    devArticles.map((article) =>
      fetch(`https://dev.to/api/articles/${article.id}`).then((result) =>
        result.json(),
      ),
    ),
  );

  return fullDevArticles.map(createArticle);
}
