import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
  FaAt,
} from 'react-icons/fa';
import classNames from 'classnames';

interface SocialProps {
  className?: string;
}

function Social({ className }: SocialProps) {
  return (
    <ul
      className={classNames(
        'grid gap-4 md:gap-8 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2',
        className,
      )}
    >
      <SocialItem
        href="https://twitter.com/horusgoul"
        label="Twitter"
        icon={<FaTwitter />}
      >
        twitter.com/horusgoul
      </SocialItem>
      <SocialItem
        href="https://twitter.com/horusgoul"
        label="GitHub"
        icon={<FaGithub />}
      >
        github.com/horusgoul
      </SocialItem>
      <SocialItem
        href="https://twitter.com/horusgoul"
        label="LinkedIn"
        icon={<FaLinkedin />}
      >
        linkedin.com/in/horusgoul
      </SocialItem>
      <SocialItem
        href="https://twitter.com/horusgoul"
        label="YouTube"
        icon={<FaYoutube />}
      >
        youtube.com/horusgoul
      </SocialItem>
      <SocialItem
        href="https://twitter.com/horusgoul"
        label="Twitch"
        icon={<FaTwitch />}
      >
        twitch.com/horusgoul
      </SocialItem>
      <SocialItem
        href="https://twitter.com/horusgoul"
        label="Email"
        icon={<FaAt />}
      >
        horusgoul@gmail.com
      </SocialItem>
    </ul>
  );
}

export default Social;

interface SocialItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SocialItem({ href, icon, children, label }: SocialItemProps) {
  return (
    <li>
      <a
        href={href}
        className={classNames(
          'group',
          'rounded-none xsm:rounded-md',
          'bg-white',
          'shadow-sm',
          'px-6 py-4',
          'flex items-center',
          'text-gray-700',
          'transition-color-shadow duration-200 ease-linear',
          'focus:text-black focus:shadow-lg md:focus:shadow-xl',
          'hover:text-black hover:shadow-lg md:focus:shadow-xl',
        )}
      >
        <span role="img" aria-label={label} className="w-5 mr-6 text-xl">
          {icon}
        </span>
        <span className="font-medium">{children}</span>
      </a>
    </li>
  );
}
