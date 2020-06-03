import classNames from 'classnames';
import styles from './ProjectCard.module.scss';
import Container from '../container';

export interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
}

function ProjectCard({ href, title, description }: ProjectCardProps) {
  return (
    <div className={classNames(styles.projectCard)}>
      <Container className={styles.content}>
        <div>
          <h3 className={styles.title}>{title}</h3>

          <span className={styles.description}>{description}</span>
        </div>

        <div className={styles.device} aria-hidden="true">
          <iframe title="Atom Preview" src={href} scrolling="no" />
        </div>
      </Container>

      <div className={styles.overlay} />
    </div>
  );
}

export default ProjectCard;
