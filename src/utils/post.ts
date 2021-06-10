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
    }

    state = 'scheduled';
  } else {
    state = 'draft';
  }

  return state;
}
