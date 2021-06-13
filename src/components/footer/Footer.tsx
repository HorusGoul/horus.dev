import { useRecursion } from '@/recursion';
import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { RiExternalLinkLine } from 'react-icons/ri';

function Footer() {
  const recursion = useRecursion();

  return (
    <div className="pt-12 md:pt-32 pb-4">
      <p className="flex flex-col text-gray-900">
        <span className="text-xl font-medium pb-2">
          Made with{' '}
          <BsHeartFill
            aria-label="Love"
            className="inline-block text-red-600"
          />{' '}
          by{' '}
          <span
            tabIndex={0}
            role="link"
            onClick={recursion}
            onKeyDown={recursion}
            className="outline-none"
          >
            me
          </span>{' '}
          —{' '}
          <span className="font-light">
            Source code available on&nbsp;
            <a
              href="https://github.com/HorusGoul/horus.dev"
              className="inline-flex items-center font-normal hover:text-gray-700"
            >
              GitHub
              <RiExternalLinkLine
                className="ml-1 mb-1 inline-block"
                aria-hidden="true"
              />
            </a>
          </span>
        </span>

        <span className="font-light mt-2">
          Follow me on{' '}
          <a
            href="https://twitter.com/HorusGoul"
            className="inline-flex items-center font-normal underline hover:no-underline hover:text-gray-700"
          >
            Twitter
          </a>{' '}
          if you want to know more about my future articles, projects, or
          whatever I come up with!
        </span>
      </p>
    </div>
  );
}

export default Footer;
