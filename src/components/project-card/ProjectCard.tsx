import classNames from 'classnames';
import styles from './ProjectCard.module.scss';
import Container from '../container';
import { useRef, useState, useEffect, useCallback } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { motion, useAnimation } from 'framer-motion';

export interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
}

const previewVariants = {
  closed: {
    opacity: 0,
    pointerEvents: 'none',
  },
  open: {
    opacity: 1,
    pointerEvents: 'all',
  },
} as const;

function ProjectCard({ href, title, description }: ProjectCardProps) {
  const [bigPreview, setBigPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const projectCardRef = useRef<HTMLDivElement>(null);
  const hiddenFrameRef = useRef<HTMLDivElement>(null);

  const frameControls = useAnimation();
  const previewControls = useAnimation();

  const createVariants = useCallback(() => {
    const projectCard = projectCardRef.current;
    const frame = hiddenFrameRef.current;

    if (!projectCard || !frame) {
      return;
    }

    const frameRect = frame.getBoundingClientRect();
    const projectRect = projectCard.getBoundingClientRect();

    const diffX = projectRect.left - frameRect.left;
    const diffY = projectRect.top - frameRect.top;

    const topPadding = 64;

    const final = {
      position: 'fixed',
      height: document.documentElement.clientHeight - 64 - topPadding,
      width: document.documentElement.clientWidth - 48,
      top: 32 + topPadding,
      left: 24,
      transition: { type: 'tween', ease: 'easeIn', duration: 0.5 },
    } as const;

    const initial = {
      position: 'fixed',
      height: frame.offsetHeight,
      width: frame.offsetWidth,
      top: frameRect.top,
      left: frameRect.left,
      transition: { type: 'tween', ease: 'easeOut', duration: 0.5 },
    } as const;

    frameControls.setVariants({
      disabled: {
        position: 'absolute',
        top: Math.abs(diffY),
        left: Math.abs(diffX),
        transition: { duration: 0 },
      },
      final,
      initialFast: {
        ...initial,
        transition: {
          ...initial.transition,
          duration: 0,
        },
      },
      initial,
    });

    previewControls.setVariants(previewVariants);

    frameControls.start('disabled');
  }, [frameControls, previewControls]);

  const open = useCallback(async () => {
    createVariants();

    await frameControls.start('initialFast');
    await Promise.all([
      frameControls.start('final'),
      previewControls.start('open'),
    ]);

    setBigPreview(true);
  }, [frameControls, createVariants, previewControls]);

  const close = useCallback(async () => {
    await Promise.all([
      frameControls.start('initial'),
      previewControls.start('closed'),
    ]);
    await frameControls.start('disabled');
    setBigPreview(false);
  }, [frameControls, previewControls]);

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
        open();
      }
    }

    iframe.contentWindow?.postMessage('enable-preview', '*');

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [href, open]);

  useEffect(() => {
    createVariants();
  }, [createVariants]);

  return (
    <div ref={projectCardRef} className={classNames(styles.projectCard)}>
      <div className={styles.overlay} />

      <Container className={styles.content}>
        <div className="relative">
          <h3 className={styles.title}>{title}</h3>

          <span className={styles.description}>{description}</span>
        </div>

        <div
          ref={hiddenFrameRef}
          className={classNames(styles.frame, styles.fake)}
        />

        <motion.div
          initial={previewVariants.closed}
          animate={previewControls}
          className={classNames(styles.device, styles.full, styles.real)}
          onClick={close}
        >
          <button className={styles.close}>
            <span>Close preview</span>
            <RiCloseCircleLine />
          </button>
        </motion.div>

        <motion.div animate={frameControls} className="absolute">
          <div className="relative h-full w-full">
            <iframe
              ref={iframeRef}
              title="Atom Preview"
              src={href}
              scrolling={bigPreview ? 'yes' : 'no'}
              className={classNames(styles.frame)}
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default ProjectCard;
