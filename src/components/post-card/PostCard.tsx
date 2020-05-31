import classNames from 'classnames';

export interface PostCardProps {
  href: string;
  title: string;
  details: string;
}

function PostCard({ href, title, details }: PostCardProps) {
  return (
    <a
      href={href}
      className={classNames(
        'block shadow-sm  text-gray-700 rounded-none p-6 xsm:rounded-md ',
        'transition-all duration-200 ease-linear',
        'hover:text-black hover:shadow-lg hover:md:shadow-xl',
        'focus:text-black focus:shadow-lg hover:md:shadow-xl',
      )}
    >
      <h3 className="font-bold tracking-wide text-lg xsm:text-2xl md:text-3xl">
        {title}
      </h3>

      <span className="block opacity-75 tracking-wide py-2 font-light text-md xsm:text-lg md:text-xl">
        {details}
      </span>
    </a>
  );
}

export default PostCard;
