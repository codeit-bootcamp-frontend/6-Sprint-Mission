import Image from 'next/image';
import icFacebook from '@/public/images/icons/ic_facebook.svg';
import icInstagram from '@/public/images/icons/ic_instagram.svg';
import icYoutube from '@/public/images/icons/ic_youtube.svg';
import icTwitter from '@/public/images/icons/ic_twitter.svg';

export default function Footer() {
  return (
    <footer className='grid w-full grid-cols-2 gap-5 p-8 text-sm font-normal leading-5 md:pb-24 lg:pb-24 md:flex md:justify-between lg:flex lg:justify-between bg-cool-gray900 text-cool-gray400'>
      <div className='order-last md:order-1 lg:order-1 text-cool-gray700'>©codeit - 2024</div>
      <div className='flex justify-between order-1 md:gap-8 text-cool-gray200'>
        <a href='/privacy'>Privacy Policy</a>
        <a href='/faq'>FAQ</a>
      </div>
      <div className='flex justify-center order-2 h-8 gap-3'>
        <a href='http://facebook.com' target='_blank' rel='noopener noreferrer'>
          <Image src={icFacebook} width={20} alt='facebook' />
        </a>
        <a href='http://twitter.com' target='_blank' rel='noopener noreferrer'>
          <Image src={icTwitter} width={20} alt='twitter' />
        </a>
        <a href='http://youtube.com' target='_blank' rel='noopener noreferrer'>
          <Image src={icYoutube} width={20} alt='youtube' />
        </a>
        <a href='http://instagram.com' target='_blank' rel='noopener noreferrer'>
          <Image src={icInstagram} width={20} alt='instagram' />
        </a>
      </div>
    </footer>
  );
}
