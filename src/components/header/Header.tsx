import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  goBackHref?: string;
  title: string;
}

function Header({ goBackHref = '/', title }: HeaderProps) {
  return (
    <header>
      <nav className="h-16 sm:h-32 flex items-center my-0 mx-auto max-w-5xl">
        <Link href={goBackHref} passHref={true}>
          <a href="/mock" className="flex group" aria-label="Go back home">
            <div className="h-16 w-16 rounded-full overflow-hidden mr-2 group-hover:shadow-lg transition-shadow duration-200">
              <Image
                src="/images/avatar/lg.jpg"
                width={64}
                height={64}
                aria-hidden="true"
              />
            </div>
            <div className="flex items-center group-hover:opacity-70 transition-opacity duration-200">
              <span className="text-4xl text-gray-500">/</span>
              <span className="text-4xl font-semibold text-gray-900">
                {title}
              </span>
            </div>
          </a>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
