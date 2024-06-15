import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/public/images/logo/logo.svg';

// Todo : 메인 border-b 전체가 되게끔
// Todo : 자유게시판 및 중고마켓 items-center, 동적 CSS
const Header = () => {
  const { pathname } = useRouter();

  return (
    <header className="w-[1920px] m-auto flex border-[#dfdfdf] border-b items-center justify-between">
      <div className="flex gap-4">
        <Link href="/" aria-label="홈으로 이동">
          <Logo alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <ul className="flex text-center">
            <li className="w-[109px]">
              <Link
                href="/boards"
                className={pathname === '/boards' ? 'text-[blue]' : ''}
              >
                자유게시판
              </Link>
            </li>
            <li className="w-[109px]">
              <Link
                href="/"
                className={pathname === '/items' ? 'text-[blue]' : ''}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Link href="/login">로그인</Link>
    </header>
  );
};

export default Header;
