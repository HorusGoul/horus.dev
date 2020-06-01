import classNames from 'classnames';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={classNames(
        'container mx-auto py-12 px-6 xsm:px-8 md:px-12 md:py-24',
        className,
      )}
      {...props}
    />
  );
}

export default Container;
