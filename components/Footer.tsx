import React from "react";
import icon_facebook from "@/public/assets/icon_facebook.png";
import icon_twitter from "@/public/assets/icon_twitter.png";
import icon_youtube from "@/public/assets/icon_youtube.png";
import icon_insta from "@/public/assets/icon_insta.png";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="b-[0] bg-footer relative mt-auto h-[160px] w-full py-6 text-white">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between md:flex-row">
        <p className="relative -left-[10rem] top-[1rem] mb-4 text-sm md:left-0 md:top-0 md:mb-0 md:text-base">
          ©codeit - 2024
        </p>
        <div className="flex flex-row items-center md:justify-between md:gap-[20rem]">
          <div className="text-footercodeit relative -left-[5rem] top-2 mb-4 flex items-center space-x-4 md:-left-0 md:top-0 md:mb-0">
            <p className="text-sm md:text-base">
              <Link href="./privacy.html">Privacy Policy</Link>
            </p>
            <p className="text-sm md:text-base">
              <Link href="./faq.html">FAQ</Link>
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="h-5 w-5">
                <Image
                  src={icon_facebook}
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link href="https://twitter.com/" target="_blank" rel="noreferrer">
              <div className="h-5 w-5">
                <Image
                  src={icon_twitter}
                  alt="twitter"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="h-5 w-5">
                <Image
                  src={icon_youtube}
                  alt="youtube"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="h-5 w-5">
                <Image
                  src={icon_insta}
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
