import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/Button';

type Feature = {
  image: {
    src: string;
    alt: string;
  };
  subTitle: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    image: {
      src: '/images/img_home_01.png',
      alt: '인기 상품을 보고 있는 판다들',
    },
    subTitle: 'Hot item',
    title: '인기 상품을\n확인해 보세요',
    description: '가장 HOT한 중고거래 물품을\n판다 마켓에서 확인해 보세요',
  },
  {
    image: {
      src: '/images/img_home_02.png',
      alt: '상품을 검색하는 모습',
    },
    subTitle: 'Search',
    title: '구매를 원하는\n상품을 검색하세요',
    description: '구매하고 싶은 물품은 검색해서\n쉽게 찾아보세요',
  },
  {
    image: {
      src: '/images/img_home_03.png',
      alt: '여러 상품이 나열된 모습',
    },
    subTitle: 'Register',
    title: '판매를 원하는\n상품을 등록하세요',
    description: '어떤 물건이든 판매하고 싶은 상품을\n쉽게 등록하세요',
  },
];

export default function Home() {
  return (
    <>
      <Banner
        imageSrc="/images/img_home_top.png"
        title={`일상의 모든 물건을\n거래해 보세요`}
        button={{ href: '/products', content: '구경하러 가기' }}
      ></Banner>
      <article className="m-auto flex max-w-[1200px] flex-col gap-16 px-4 pb-16 pt-[52px] tablet:px-6 tablet:pb-20 tablet:pt-6 desktop:gap-[276px] desktop:px-0 desktop:pb-[276px] desktop:pt-[138px]">
        {FEATURES.map((feature, index) => (
          <Feature feature={feature} key={index} />
        ))}
      </article>
      <Banner
        imageSrc="/images/img_home_bottom.png"
        title={`믿을 수 있는\n판다마켓 중고거래`}
      />
    </>
  );
}

type BannerProp = {
  imageSrc: string;
  title: string;
  button?: {
    href: string;
    content: string;
  };
};

function Banner({ imageSrc, title, button }: BannerProp) {
  const { push } = useRouter();

  return (
    <section
      className={`h-[540px] bg-primary-300 bg-[length:624px] bg-bottom bg-no-repeat pt-12 tablet:h-[770px] tablet:bg-[length:996px] tablet:pt-[84px] desktop:h-[540px] desktop:bg-[80%_bottom] desktop:pt-0`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className="m-auto flex h-full max-w-[1200px] flex-col items-center justify-start gap-4 tablet:gap-6 desktop:items-start desktop:justify-center desktop:gap-8">
        <h2
          className={`${button !== undefined ? 'tablet:whitespace-normal' : 'tablet:whitespace-pre-wrap'} whitespace-pre-wrap text-center text-[2rem] font-bold text-gray-700 tablet:whitespace-normal tablet:text-[2.5rem] desktop:whitespace-pre-wrap desktop:text-left`}
        >
          {title}
        </h2>
        {button !== undefined && (
          <div className="tablet:flex tablet:w-full tablet:max-w-[356px] tablet:flex-col">
            <Button
              style={{ shape: 'rounded', size: 'large' }}
              onClick={() => {
                push(button.href);
              }}
            >
              <p className="text-base tablet:text-xl">{button.content}</p>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

type FeatureProp = {
  feature: Feature;
};

function Feature({ feature }: FeatureProp) {
  const { image, subTitle, title, description } = feature;

  return (
    <section className="relative m-auto flex flex-col items-start gap-5 text-gray-700 even:items-end even:text-right desktop:m-0 desktop:flex-row desktop:items-center desktop:gap-16 desktop:even:flex-row-reverse desktop:even:items-center">
      <Image width={588} height={444} src={image.src} alt={image.alt} />
      <div>
        <p className="text-base font-bold text-primary-400 tablet:text-lg">
          {subTitle}
        </p>
        <h3 className="desktop mt-2 text-2xl font-bold tracking-[.02rem] tablet:mt-3 tablet:text-[2rem] tablet:leading-tight desktop:whitespace-pre-wrap desktop:text-[2.5rem] desktop:leading-snug">
          {title}
        </h3>
        <p className="mt-5 whitespace-pre-wrap text-base font-medium leading-5 tracking-[.08rem] tablet:text-lg tablet:leading-6 desktop:mt-6 desktop:text-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
