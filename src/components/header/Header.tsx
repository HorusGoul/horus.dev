import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Container from '../container';

interface HeaderProps {
  goBackHref?: string;
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
}

function Header({
  goBackHref = '/',
  title,
  description,
  subtitle,
}: HeaderProps) {
  return (
    <Container>
      <header>
        <div className="w-full md:flex md:items-center md:flex-row">
          <div className="inline-block text-left md:flex-1 md:block">
            <h1 className="font-medium text-3xl xsm:text-4xl md:text-6xl">
              {title}
            </h1>
            <span className="font-medium font-mono w-40 text-gray-600 text-xl sm:w-auto md:text-4xl">
              {subtitle !== undefined ? (
                subtitle
              ) : (
                <>
                  by&nbsp;
                  <Link href={goBackHref}>
                    <a className="bg-gray-200 rounded-md font-bold text-gray-800 text-xl p-1 xsm:mx-1 md:text-3xl hover:opacity-90 active:opacity-80">
                      Horus Lugo
                    </a>
                  </Link>
                </>
              )}
            </span>
          </div>

          <div className="rounded-full overflow-hidden shadow-xl float-right h-20 w-20 xsm:w-32 xsm:h-32 md:float-none">
            <Image
              layout="responsive"
              width={256}
              height={256}
              src="/images/avatar/lg.jpg"
              aria-hidden="true"
              alt="My Avatar"
            />
          </div>
        </div>
      </header>

      {description && (
        <p className="text-gray-700 text-left text-sm leading-7 tracking-wider pt-8 xsm:pt-16 xsm:text-xl xsm:leading-8 md:text-2xl md:leading-10">
          {description}
        </p>
      )}
    </Container>
  );
}

export default Header;
