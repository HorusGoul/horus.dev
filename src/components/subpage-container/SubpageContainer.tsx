import classNames from 'classnames';

type SubpageContainerProps = React.HTMLAttributes<HTMLDivElement>;

function SubpageContainer({ className, ...props }: SubpageContainerProps) {
  return (
    <div
      className={classNames(
        'container mx-auto px-6 xsm:px-8 md:px-12',
        className,
      )}
      {...props}
    />
  );
}

export default SubpageContainer;
