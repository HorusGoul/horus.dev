import classNames from 'classnames';
import styles from './ProjectCard.module.scss';
import Container from '../container';
import { useRef, useState, useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

export interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
}

function ProjectCard({ href, title, description }: ProjectCardProps) {
  const [bigPreview, setBigPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (typeof window !== 'undefined')
    window.addEventListener('message', (e) => console.log(e));

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    const url = new URL(href);

    function listener(e: MessageEvent) {
      if (e.origin !== url.origin) {
        return;
      }

      const data = e.data;

      if (data === 'click') {
        setBigPreview(true);
      }
    }

    iframe.contentWindow?.postMessage('enable-preview', '*');

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [href]);

  return (
    <div className={classNames(styles.projectCard)}>
      <Container className={styles.content}>
        <div>
          <h3 className={styles.title}>{title}</h3>

          <span className={styles.description}>{description}</span>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className={classNames(styles.device, 'opacity-0')}
          >
            <div className={styles.frame} />
          </div>

          <div
            className={classNames(styles.device, styles.real, {
              [styles.full]: bigPreview,
            })}
            aria-hidden="true"
            onClick={() => setBigPreview(false)}
          >
            {bigPreview && (
              <button className={styles.close}>
                <span>Close preview</span>
                <RiCloseCircleLine />
              </button>
            )}
            <iframe
              ref={iframeRef}
              title="Atom Preview"
              src={href}
              scrolling={bigPreview ? 'yes' : 'no'}
              className={styles.frame}
            />
          </div>
        </div>
      </Container>

      <div className={styles.overlay} />
    </div>
  );
}

export default ProjectCard;
