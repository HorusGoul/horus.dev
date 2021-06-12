import { Post } from '.prisma/client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface PostEditorContext {
  post: Post;
  draft: Post;
  updateDraft: (
    partial: Partial<Pick<Post, 'title' | 'body' | 'publishedAt'>>,
  ) => void;
  uploadImage: (data: ArrayBuffer) => AsyncGenerator<string, boolean, unknown>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const PostEditorContext = createContext<PostEditorContext>({});

interface PostEditorProviderProps {
  post: Post;
  children: React.ReactNode;
}

export function PostEditorProvider({
  children,
  post,
}: PostEditorProviderProps) {
  const [draft, setDraft] = useState(() => ({ ...post }));

  const updateDraft = useCallback(
    (partial: Partial<Pick<Post, 'title' | 'body' | 'publishedAt'>>) => {
      setDraft((draft) => ({ ...draft, ...partial }));
    },
    [],
  );

  const saveDraft = useCallback((draft: Post) => {
    return fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ id: draft.id, body: draft.body }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      saveDraft(draft);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [draft, saveDraft]);

  const uploadImage = useCallback(async function* (data: ArrayBuffer) {
    yield 'https://placeimg.com/200/200';

    return true;
  }, []);

  return (
    <PostEditorContext.Provider
      value={{ post, draft, updateDraft, uploadImage }}
    >
      {children}
    </PostEditorContext.Provider>
  );
}

export function usePostEditor() {
  const { post, ...context } = useContext(PostEditorContext);

  if (!post) {
    throw new Error(
      'usePostEditor can only be called in a tree wrapped by <PostEditorProvider />',
    );
  }

  return {
    post,
    ...context,
  };
}
