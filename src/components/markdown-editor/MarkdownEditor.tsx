import { usePostEditor } from '@/contexts/post-editor';
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactMde from 'react-mde';
import styles from './react-mde-styles/react-mde-all.module.scss';
import PostRenderer from '../post-renderer';

interface MdxEndpointResult {
  code: string;
  frontmatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

async function generateMarkdownPreview(
  source: string,
): Promise<React.ReactNode> {
  try {
    const response = await fetch('/api/mdx', {
      method: 'POST',
      body: JSON.stringify({ source }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const json: MdxEndpointResult = await response.json();

    if (response.status !== 200) {
      throw new Error(await response.text());
    }

    return (
      <div className="py-8">
        <PostRenderer {...json} />
      </div>
    );
  } catch (e) {
    return (
      <>
        <span>Failed to retrieve mdx. Error:</span>
        <pre>
          <code>{e.message}</code>
        </pre>
      </>
    );
  }
}

function MarkdownEditor() {
  const { draft, updateDraft } = usePostEditor();
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <ReactMde
      value={draft.body}
      onChange={(body) => updateDraft({ body })}
      selectedTab={tab}
      onTabChange={setTab}
      generateMarkdownPreview={generateMarkdownPreview}
      classes={{ reactMde: styles.markdownEditor }}
      textAreaComponent={ResizableTextarea}
    />
  );
}

export default MarkdownEditor;

const ResizableTextarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ value, ...props }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const field = internalRef.current;

    function resize() {
      if (!field) {
        return;
      }

      field.style.height = 'auto';
      field.style.height = field.scrollHeight + 48 + 'px';
    }

    function on(event: string, handler: () => void) {
      field?.addEventListener(event, handler);
    }

    function off(event: string, handler: () => void) {
      field?.removeEventListener(event, handler);
    }

    on('change', resize);
    on('cut', resize);
    on('paste', resize);
    on('drop', resize);
    on('keydown', resize);

    resize();

    return () => {
      off('change', resize);
      off('cut', resize);
      off('paste', resize);
      off('drop', resize);
      off('keydown', resize);
    };
  }, []);

  return (
    <div
      className="p-4 rounded-lg bg-gray-100 mb-72 transition-colors duration-200 
    focus-within:ring-0 focus-within:bg-gray-200 outline-none font-mono"
    >
      <textarea
        ref={(element) => {
          internalRef.current = element;

          if (ref === null) {
            return;
          }

          if ('current' in ref) {
            ref.current = element;
          } else {
            ref(element);
          }
        }}
        value={value}
        {...props}
        rows={1}
      />
    </div>
  );
});

ResizableTextarea.displayName = 'ResizableTextarea';
