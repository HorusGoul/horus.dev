import Link from 'next/link';
import Image from 'next/image';
import SubpageContainer from '../subpage-container';
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
  if (false) {
    return (
      <header className="py-8">
        <SubpageContainer>
          <nav className="h-16 sm:h-32 flex items-center my-0 mx-auto">
            <Link href={goBackHref} passHref={true}>
              <a href="/mock" className="flex group" aria-label="Go back home">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4 group-hover:shadow-lg transition-shadow duration-200">
                  <Image
                    src="/images/avatar/lg.jpg"
                    width={64}
                    height={64}
                    aria-hidden="true"
                    alt="My Avatar"
                  />
                </div>
                <div className="flex items-center text-3xl xsm:text-4xl font-medium group-hover:opacity-80 transition-opacity duration-200">
                  {title}
                </div>
              </a>
            </Link>
          </nav>
        </SubpageContainer>
      </header>
    );
  }

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
                  <code className="bg-gray-200 rounded-md font-bold text-gray-800 text-xl p-1 xsm:mx-1 md:text-3xl">
                    Horus Lugo
                  </code>
                </>
              )}
            </span>
          </div>

          <div className="rounded-full overflow-hidden shadow-xl float-right h-20 w-20 xsm:w-32 xsm:h-32 md:float-none ">
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
