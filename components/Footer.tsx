import Image from 'next/image';
import Link from 'next/link';

type Nav = {
  name: string;
  url: string;
};

type Social = {
  name: string;
  url: string;
  iconSrc: string;
};

const NAVS: Nav[] = [
  {
    name: 'Privacy Policy',
    url: '/privacy',
  },
  {
    name: 'FAQ',
    url: '/faq',
  },
];

const SOCIALS: Social[] = [
  {
    name: '페이스북',
    url: 'https://www.facebook.com/',
    iconSrc: '/images/ic_facebook.svg',
  },
  {
    name: '트위터',
    url: 'https://twitter.com/?lang=ko',
    iconSrc: '/images/ic_twitter.svg',
  },
  {
    name: '유튜브',
    url: 'https://www.youtube.com/',
    iconSrc: '/images/ic_youtube.svg',
  },
  {
    name: '인스타그램',
    url: 'https://www.instagram.com/',
    iconSrc: '/images/ic_instagram.svg',
  },
];

export default function Footer() {
  return (
    <footer className="h-40 bg-gray-900">
      <div className="m-auto flex h-full max-w-[1920px] flex-wrap-reverse items-end justify-between p-8 text-base font-normal tablet:px-[104px] desktop:px-[200px]">
        <div className="grow basis-full self-start text-gray-400 tablet:grow-0 tablet:basis-auto tablet:self-auto">
          ©codeit - 2024
        </div>
        <div className="flex gap-[30px]">
          {NAVS.map((nav) => (
            <Link
              href={nav.url}
              className="text-gray-200 active:text-primary-400"
              key={nav.name}
            >
              {nav.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          {SOCIALS.map((social) => (
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              key={social.name}
            >
              <Image
                width={20}
                height={20}
                src={social.iconSrc}
                alt={`${social.name} 아이콘`}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
