import React from 'react';
import schoolPanda from '@/src/img/schoolPanda.png';
import hotItem from '@/src/img/hotIem.png';
import search from '@/src/img/search.png';
import bottomImage from '@/src/img/bottomImage.png';
import registerImage from '@/src/img/registerImage.png';
import instagramIcon from '@/src/img/instagram.png';
import facebookIcon from '@/src/img/facebook.png';
import twitterIcon from '@/src/img/twitter.png';
import youtubeIcon from '@/src/img/youtube.png';
import style from '@/styles/Main.module.css';
import Link from 'next/link';

const MainPage = () => {
  return (
    <>
      <main className={style.mainFrame}>
        <div className={style['card']}>
          <div className={style['box']}>
            <h1>
              일상의 모든 물건을 <br />
              거래해보세요
            </h1>
            <Link href={'/items'}>구경하러 가기</Link>
          </div>
          <img src={schoolPanda.src} alt='가방팬더' />
        </div>
        <div className={style['section']}>
          <div className={style['confirmBox']}>
            <img src={hotItem.src} alt='인기상품' />
            <div className={style['specific']}>
              <h1>
                인기 상품을 <br />
                확인해 보세요
              </h1>
              <p>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
        <div className={style['section']}>
          <div className={style['searchBox']}>
            <div className={style['specific2']}>
              <h1>
                구매를 원하는
                <br />
                상품을 검색하세요
              </h1>
              <p>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img src={search.src} alt='검색' />
          </div>
        </div>
        <div className={style['section']}>
          <div className={style['registerBox']}>
            <img src={registerImage.src} alt='등록이미지' />
            <div className={style['specific3']}>
              <h1>
                판매를 원하는 <br />
                상품을 등록하세요
              </h1>
              <p>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
        <div className={style['bottomCard']}>
          <h2>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h2>
          <img src={bottomImage.src} alt='가방들고있는판다들' />
        </div>
      </main>

      <footer className={style.footerFrame}>
        <div className={style['tag']}>
          <div className={style['mark']}>
            <p className={style['codeit']}>@codeit - 2024</p>
            <div className={style['privacy-container']}>
              <p className={style['privacy']}>Privacy Policy</p>
              <p className={style['faq']}>FAQ</p>
            </div>
          </div>
          <div className={style['social']}>
            <a>
              <img src={facebookIcon.src} />
            </a>
            <a>
              <img src={twitterIcon.src} />
            </a>
            <a>
              <img src={youtubeIcon.src} />
            </a>
            <a>
              <img src={instagramIcon.src} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainPage;

