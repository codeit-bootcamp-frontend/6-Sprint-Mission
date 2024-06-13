import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from './Button';

type Nav = {
  url: string;
  matchPattern: RegExp;
  navName: string;
};

const NAVS: Nav[] = [
  {
    url: '/boards',
    matchPattern: /^\/boards(\/\d+)?$|^\/addboard$/,
    navName: '자유게시판',
  },
  {
    url: '/products',
    matchPattern: /^\/products(\/\d+)?$/,
    navName: '중고마켓',
  },
];

export default function Header() {
  const { push, asPath } = useRouter();

  return (
    <header className="fixed top-0 z-50 h-[70px] w-full border-b border-solid border-gray-300 bg-white">
      <div className="m-auto flex h-full max-w-[1920px] items-center justify-between gap-8 px-4 py-[10px] tablet:px-6 desktop:px-[200px]">
        <Link href="/">
          <Image
            width={81}
            height={40}
            className="block tablet:hidden"
            src="/images/logo_small.svg"
            alt="판다마켓 로고"
            priority
          />
          <Image
            width={153}
            height={51}
            className="hidden tablet:block"
            src="/images/logo_big.svg"
            alt="판다마켓 로고"
            priority
          />
        </Link>
        <nav className="grow">
          <ul className="flex">
            {NAVS.map((nav) => (
              <li
                className={`${nav.matchPattern.test(asPath) ? 'text-primary-400 hover:text-primary-600 active:text-primary-700' : 'text-gray-600 hover:text-gray-800 active:text-gray-900'} w-[108px] text-center text-lg font-bold leading-none`}
                key={nav.url}
              >
                <Link href={nav.url}>{nav.navName}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          style={{ shape: 'square', size: 'small' }}
          onClick={() => {
            push('/signin');
          }}
        >
          로그인
        </Button>
      </div>
    </header>
  );
}
