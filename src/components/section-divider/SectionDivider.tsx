import styles from './SectionDivider.module.scss';

interface SectionDividerProps {
  color?: string;
  backgroundColor?: string;
  reverse?: boolean;
}

function SectionDivider({
  color = '#ffffff',
  backgroundColor = '#000000',
  reverse = false,
}: SectionDividerProps) {
  return (
    <div className="relative">
      <div
        className={styles.shapeDivider}
        style={{ backgroundColor, transform: reverse ? 'unset' : undefined }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66 92.83C906.67 72 823.78 31 743.84 14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84 11.73-114 31.07-172 41.86A600.21 600.21 0 010 27.35V120h1200V95.8c-67.81 23.12-144.29 15.51-214.34-2.97z"
            fill={color}
          />
        </svg>
      </div>
    </div>
  );
}

export default SectionDivider;
