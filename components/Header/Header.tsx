import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-20 py-2 gap-10 border-b-2 bg-white">
      <Link href="/">
        <Image src={Logo} alt="logo" width={128} height={48} />
      </Link>
      <div className="grow flex">
        <Link href="/boards">
          <p className="text-lg text-primaryColor mr-4 font-bold">자유게시판</p>
        </Link>
        <Link href="/items">
          <p className="text-lg text-coolGray-600 mr-4 font-bold">중고마켓</p>
        </Link>
      </div>
      <Link href="/login">
        <p className="bg-primaryColor hover:bg-blue-400 px-4 py-3 text-white rounded-lg">
          로그인
        </p>
      </Link>
    </header>
  );
}
