import Image from 'next/image';
import Container from '@/components/Container';

import IMG_NOTFOUND from '@/public/img-notfound.svg';

export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <Image
              width={500}
              height={500}
              style={{ width: '500px', height: '500px' }}
              src={IMG_NOTFOUND}
              alt={'찾을 수 없는 페이지 이미지'}
            />
            <div>
              <p className="text-[#1f2937] font-semibold text-[20px]">
                {'찾을 수 없는 페이지입니다.'}
              </p>
              <p className="text-[#1f2937] font-semibold text-[20px]">
                {'요청하신 페이지가 사라졌거나,'}
              </p>
              <p className="text-[#1f2937] font-semibold text-[20px]">
                {'잘못된 경로를 이용하셨어요. :)'}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
