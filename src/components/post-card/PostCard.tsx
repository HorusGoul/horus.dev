import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

export interface PostCardProps {
  href: string;
  title: React.ReactNode;
  details: React.ReactNode;
  heading?: React.ElementType;
}

function PostCard({
  href,
  title,
  details,
  heading: Heading = 'h3',
}: PostCardProps) {
  return (
    <Link href={href} passHref={true}>
      <a
        href={href}
        className={classNames(
          'block shadow-sm  text-gray-700 rounded-none p-6 xsm:rounded-md bg-white',
          'transition-color-shadow duration-200 ease-linear',
          'hover:text-black hover:shadow-lg hover:md:shadow-xl',
          'focus:text-black focus:shadow-lg hover:md:shadow-xl',
        )}
      >
        <Heading className="font-bold tracking-wide text-lg xsm:text-2xl md:text-3xl">
          {title}
        </Heading>

        <span className="block tracking-wide pt-2 font-light text-md xsm:text-lg xsm:pt-4 md:pt-6 md:text-xl">
          {details}
        </span>
      </a>
    </Link>
  );
}

export default PostCard;
