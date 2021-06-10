import { usePostEditor } from '@/contexts/post-editor';
import React, { useState } from 'react';
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

    return <PostRenderer {...json} />;
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
    />
  );
}

export default MarkdownEditor;
