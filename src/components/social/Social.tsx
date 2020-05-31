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
        'grid gap-4 md:gap-6 md:grid-cols-2 md:grid-rows-3',
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
          'rounded-md',
          'bg-white',
          'shadow-md',
          'p-4',
          'flex items-center',
          'text-gray-700',
          'transition-colors transition-shadow duration-200 ease-linear',
          'focus:text-black focus:shadow-lg',
          'hover:text-black hover:shadow-lg',
        )}
      >
        <span role="img" aria-label={label} className="pr-4 w-8 text-lg">
          {icon}
        </span>
        <span>{children}</span>
      </a>
    </li>
  );
}
