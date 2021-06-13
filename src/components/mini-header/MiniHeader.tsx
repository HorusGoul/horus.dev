import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import styles from './MiniHeader.module.scss';

const headerItems = [
  {
    href: '/blog',
    name: 'Blog',
  },
  {
    href: 'https://twitter.com/HorusGoul',
    name: 'Twitter',
  },
  {
    href: 'https://youtube.com/c/HorusGoul',
    name: 'YouTube',
  },
  {
    href: 'https://twitch.tv/HorusGoul',
    name: 'Twitch',
  },
];

function MiniHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="max-w-5xl mx-auto my-0 relative">
      <nav className="h-24 flex items-center">
        <div className="inline-flex items-center">
          <Link href="/">
            <a className="text-2xl leading-6 font-semibold font-mono text-purple-700">
              Horus Lugo
            </a>
          </Link>
        </div>

        <div className="ml-auto">
          <button
            onClick={() => setOpen((current) => !current)}
            className="w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-200 bg-gray-100 hover:bg-gray-200 active:opacity-80"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <MdClose className="w-6 h-6 text-gray-700" />
            ) : (
              <MdMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <div
          className={classNames(
            'absolute max-w-xs w-full bg-gray-100 top-20 right-0 rounded-lg shadow-xl',
            styles.root,
            {
              [styles.open]: open,
            },
          )}
          onBlur={(e) => {
            const relatedTarget = e.relatedTarget as Node | null;

            if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
              return;
            }

            setOpen(false);
          }}
        >
          <ul className="w-full">
            {headerItems.map((item) => {
              return (
                <li key={item.name} className="w-full">
                  <Link href={item.href}>
                    <a
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                      tabIndex={open ? 0 : -1}
                      className="block px-4 py-4 w-full"
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MiniHeader;
