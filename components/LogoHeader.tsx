import Image from 'next/image';
import Link from 'next/link';

export default function LogoHeader() {
  return (
    <header className="flex justify-center pt-6 tablet:pt-12 desktop:pt-16">
      <Link href="/">
        <Image
          width={198}
          height={66}
          className="tablet:h-[132px] tablet:w-[396px]"
          src="/images/logo_big.svg"
          alt="판다마켓 로고"
          priority
        />
      </Link>
    </header>
  );
}
