import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Link href="/">
        <h2>홈으로 이동</h2>
      </Link>
    </>
  );
}
