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
        'block shadow-sm rounded-md p-6 text-gray-700',
        'transition-all duration-200 ease-linear',
        'hover:text-black hover:shadow-lg hover:md:shadow-xl',
        'focus:text-black focus:shadow-lg hover:md:shadow-xl',
      )}
    >
      <h3 className="text-2xl md:text-3xl font-bold tracking-wide">{title}</h3>

      <span className="block opacity-75 tracking-wide py-2 font-light text-lg md:text-xl">
        {details}
      </span>
    </a>
  );
}

export default PostCard;
