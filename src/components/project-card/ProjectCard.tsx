import classNames from 'classnames';
import styles from './ProjectCard.module.scss';
import Container from '../container';
import { useRef, useState, useEffect, useCallback } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { motion, useAnimation } from 'framer-motion';
import * as bodyScrollLock from 'body-scroll-lock';

export interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
}

const previewVariants = {
  closed: {
    opacity: 0,
    pointerEvents: 'none',
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
  },
  open: {
    opacity: 1,
    pointerEvents: 'all',
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
  },
} as const;

function ProjectCard({ href, title, description }: ProjectCardProps) {
  const [bigPreview, setBigPreview] = useState(false);
  const [lockHover, setLockHover] = useState(false);
  const [lockScroll, setLockScroll] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const projectCardRef = useRef<HTMLDivElement>(null);
  const hiddenFrameRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

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
        height: initial.height,
        width: initial.width,
      },
      final,
      initialFast: {
        ...initial,
        transition: {
          ...initial.transition,
          duration: 0,
        },
      },
      finalFast: {
        ...final,
        transition: {
          ...initial.transition,
          duration: 0,
        },
      },
      initial,
    });

    previewControls.setVariants(previewVariants);
  }, [frameControls, previewControls]);

  const open = useCallback(async () => {
    if (animatingRef.current || bigPreview) {
      return;
    }

    animatingRef.current = true;

    createVariants();

    setLockHover(true);
    await frameControls.start('initialFast');
    await Promise.all([
      frameControls.start('final'),
      previewControls.start('open'),
    ]);
    setBigPreview(true);
    setLockScroll(false);

    animatingRef.current = false;
  }, [frameControls, createVariants, previewControls, bigPreview]);

  const close = useCallback(async () => {
    if (animatingRef.current || !bigPreview) {
      return;
    }

    animatingRef.current = true;

    setLockScroll(true);
    await Promise.all([
      frameControls.start('initial'),
      previewControls.start('closed'),
    ]);
    await frameControls.start('disabled');
    setBigPreview(false);
    setLockHover(false);

    animatingRef.current = false;
  }, [frameControls, previewControls, bigPreview]);

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
    frameControls.start('disabled');
  }, [createVariants, frameControls]);

  useEffect(() => {
    async function resizeListener() {
      createVariants();

      if (bigPreview) {
        frameControls.start('finalFast');
      } else {
        frameControls.start('disabled');
      }
    }

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [createVariants, frameControls, previewControls, bigPreview]);

  useEffect(() => {
    if (!projectCardRef.current) {
      return;
    }

    if (bigPreview) {
      bodyScrollLock.disableBodyScroll(projectCardRef.current, {
        reserveScrollBarGap: true,
      });
    } else {
      bodyScrollLock.clearAllBodyScrollLocks();
    }
  }, [bigPreview]);

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

        <motion.div
          animate={frameControls}
          className={classNames(styles.frameControls, {
            [styles.lockHover]: lockHover,
          })}
        >
          <div className="relative h-full w-full">
            <iframe
              ref={iframeRef}
              title="Atom Preview"
              src={href}
              scrolling={lockScroll ? 'no' : 'yes'}
              className={classNames(styles.frame)}
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default ProjectCard;
