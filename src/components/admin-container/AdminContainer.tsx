import classNames from 'classnames';

type AdminContainerProps = React.HTMLAttributes<HTMLDivElement>;

function AdminContainer({ className, ...props }: AdminContainerProps) {
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

export default AdminContainer;
