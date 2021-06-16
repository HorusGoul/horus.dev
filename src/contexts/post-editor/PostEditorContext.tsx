import { Post } from '.prisma/client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import superjson from 'superjson';
import { toast } from 'react-hot-toast';

interface PostEditorContext {
  post: Post;
  draft: Post;
  updateDraft: (
    partial: Partial<Pick<Post, 'title' | 'body' | 'publishedAt'>>,
  ) => void;
  uploadImage: (
    data: ArrayBuffer,
    file: Blob,
  ) => AsyncGenerator<string, boolean, unknown>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const PostEditorContext = createContext<PostEditorContext>({});

interface PostEditorProviderProps {
  post: Post;
  setPost: (post: Post) => void;
  children: React.ReactNode;
}

const SAVE_DRAFT_TIMEOUT = 1000;

export function PostEditorProvider({
  children,
  post,
  setPost,
}: PostEditorProviderProps) {
  const [draft, setDraft] = useState(() => ({ ...post }));

  const updateDraft = useCallback(
    (partial: Partial<Pick<Post, 'title' | 'body' | 'publishedAt'>>) => {
      setDraft((draft) => ({ ...draft, ...partial }));
    },
    [],
  );

  const lastSavePromiseRef = useRef<Promise<unknown> | null>(null);

  const saveDraft = useCallback(
    (draft: Post) => {
      localStorage.setItem(`${draft.id}:${Date.now()}`, draft.body);

      const keys: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.startsWith(draft.id)) {
          keys.push(key);
        }
      }

      keys.sort((a, b) => b.localeCompare(a));
      keys.slice(10).forEach((key) => localStorage.removeItem(key));

      let promise = fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ id: draft.id, body: draft.body }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.text();
          }

          throw new Error(`Couldn't save. Check your markdown and try again.`);
        })
        .then((json) => setPost(superjson.parse(json)));

      toast.promise(promise, {
        loading: 'Saving post...',
        error: (e) => e.message,
        success: 'Post saved!',
      });

      promise = promise.catch((e) => {
        console.error(e.message);
      });

      if (lastSavePromiseRef.current === null) {
        lastSavePromiseRef.current = promise;
      } else {
        lastSavePromiseRef.current = lastSavePromiseRef.current.finally(
          () => promise,
        );
      }
    },
    [setPost],
  );

  const firstRenderRef = useRef(true);
  const lockSavingRef = useRef(false);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (lockSavingRef.current) {
      return;
    }

    const interval = setTimeout(() => {
      saveDraft(draft);
    }, SAVE_DRAFT_TIMEOUT);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (lockSavingRef.current) {
        return;
      }

      clearTimeout(interval);
    };
  }, [draft, saveDraft]);

  const uploadImage = useCallback(async function* (
    data: ArrayBuffer,
    file: Blob,
  ) {
    const toastId = toast.loading(`Getting upload signed url from the API...`);
    lockSavingRef.current = true;

    let response = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ contentType: file.type }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.status !== 200) {
      toast.error('Failed to get upload signed url', { id: toastId });
      lockSavingRef.current = false;
      return false;
    }

    toast.loading(`Uploading image to S3...`, { id: toastId });

    const json: { uploadUrl: string; url: string } = await response.json();

    response = await fetch(json.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    });

    if (response.status !== 200) {
      toast.error('Failed to upload image to S3', { id: toastId });
      lockSavingRef.current = false;
      return false;
    }

    toast.success('Image upload successfully!', { id: toastId });
    lockSavingRef.current = false;

    yield json.url;

    return true;
  },
  []);

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
