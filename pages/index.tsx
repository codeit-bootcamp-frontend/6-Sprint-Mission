import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import imgHomeBottom from '@/public/images/Img_home_bottom.png';
import imgHomeTop from '@/public/images/Img_home_top.png';
import imgHotItem from '@/public/images/Img_home_register.png';
import imgRegister from '@/public/images/Img_home_hot_item.png';
import imgSearch from '@/public/images/Img_home_search.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name='description' content='The best flea market in the world - Home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <section className='overflow-hidden bg-sky-blue200'>
          <div className='m-auto w-mobile h-[540px] md:w-tablet md:h-[771px] lg:w-desktop lg:h-[540px]'>
            <div className='flex flex-col gap-4 w-[240px] md:w-[512px] lg:w-[355px] relative top-12 left-12 text-center'>
              <h3 className='font-bold text-[32px] break-words'>일상의 모든 물건을 거래해 보세요</h3>
              <Link href='/'>
                <button className='w-[154px] h-[48px] text-white bg-brand-blue rounded-3xl md:w-[355px] md:h-[60px]'>
                  구경하러 가기
                </button>
              </Link>
            </div>
            <div className='relative'>
              <picture className='absolute top-[115px] left-[-130px] w-[626px] md:w-[996px] md:h-[447px] md:top-[213px] md:left-[-150px]'>
                <Image src={imgHomeTop} alt='구경가는 판다 이미지' />
              </picture>
            </div>
          </div>
        </section>

        <section className='main_info_container'>
          <div className='m-auto w-mobile md:w-tablet lg:w-desktop'>
            <div className='main_info'>
              <picture className='img_wrap'>
                <Image src={imgHotItem} alt='핫 아이템 이미지' />
              </picture>
              <div className='text_wrap'>
                <h4 className='blue-title'>Hot item</h4>
                <h2 className='title'>인기 상품을 확인해 보세요</h2>
                <h3 className='description'>가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요</h3>
              </div>
            </div>

            <div className='m-auto w-mobile md:w-tablet lg:w-desktop'>
              <picture className='img_wrap'>
                <Image src={imgSearch} alt='검색 이미지' />
              </picture>
              <div className='text_wrap'>
                <h4 className='blue-title'>Search</h4>
                <h2 className='title'>구매를 원하는 상품을 검색하세요</h2>
                <h3 className='description'>구매하고 싶은 물품은 검색해서 쉽게 찾아보세요</h3>
              </div>
            </div>

            <div className='main_info'>
              <picture className='img_wrap'>
                <Image src={imgRegister} alt='등록 이미지' />
              </picture>
              <div className='text_wrap'>
                <h4 className='blue-title'>Register</h4>
                <h2 className='title'>판매를 원하는 상품을 등록하세요</h2>
                <h3 className='description'>어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요</h3>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-sky-blue200 m-auto h-[540px] md:h-[771px] lg:h-[540px] overflow-hidden'>
          <div className='m-auto w-mobile md:w-tablet lg:w-desktop'>
            <h3 className='font-bold text-[32px] break-words relative top-12 text-center'>
              믿을 수 있는 <br />
              판다마켓 중고거래
            </h3>
            <div className='relative'>
              <picture className='absolute top-[105px] left-[-140px] w-[626px]'>
                <Image src={imgHomeBottom} alt='믿을 수 있는 판다마켓' />
              </picture>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
