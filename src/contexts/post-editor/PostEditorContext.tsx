import { Post } from '.prisma/client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PostEditorContext {
  post: Post;
  draft: Post;
  updateDraft: (
    partial: Partial<Pick<Post, 'title' | 'body' | 'publishedAt'>>,
  ) => void;
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

  return (
    <PostEditorContext.Provider value={{ post, draft, updateDraft }}>
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
