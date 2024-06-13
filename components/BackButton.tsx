import { Url } from 'next/dist/shared/lib/router/router';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from './Button';

type BackButtonProp = {
  to: Url;
};

export default function BackButton({ to }: BackButtonProp) {
  const { push } = useRouter();

  const handleButtonClick = () => {
    push(to);
  };

  return (
    <Button
      style={{ shape: 'rounded', size: 'large' }}
      onClick={handleButtonClick}
    >
      목록으로 돌아가기
      <Image
        src="/images/ic_back.svg"
        width={24}
        height={24}
        className="ml-[10px]"
        alt="뒤로가기 아이콘"
      />
    </Button>
  );
}
