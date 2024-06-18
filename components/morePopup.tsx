import Link from "next/link";

interface MoreProps {
  url: string;
  id: number;
  redirectPageName: string;
  funcName: (val: number) => Promise<number>;
}

export default function More({
  url,
  funcName,
  id,
  redirectPageName,
}: MoreProps) {
  const handleOnClick = async (id: number) => {
    const func = await funcName(id);
    if (func === 0) {
      alert("오류가 발생했습니다.");
    } else {
      alert("삭제가 완료되었습니다.");
      window.location.href = redirectPageName;
    }
  };

  return (
    <div className="morePopup">
      <ul>
        <li>
          <Link href={url}>수정하기</Link>
        </li>
        <li>
          <button type="button" onClick={() => handleOnClick(id)}>
            삭제하기
          </button>
        </li>
      </ul>
    </div>
  );
}
