"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer(props: Readonly<{ children: { name: string; href: string; }[]; }>)
{
	return (
		<footer class="flex relative bg-[#111827]">
			<div class="flex justify-between w-full h-[160px] pt-[32px] pb-[64px] mobile:mx-[16px] tablet:mx-[24px] desktop:mx-[200px] *:shrink-0">
				<div class="font-[400] text-[#72787F] text-[16px] mobile:absolute mobile:bottom-[32px]">
					@codeit - 2024
				</div>
				<div class="flex gap-[30px]">
				{props.children?.map((args, index) =>
				(
					<Link key={index} href={args.href}>
						<div class="font-[400] text-[#E5E7EB] text-[16px]">
							{args.name}
						</div>
					</Link>
				))}
				</div>
				<div class="flex gap-[12px]">
 				{[
					{
						src: "icons/facebook.svg",
						href: "https://www.facebook.com",
					},
					{
						src: "icons/twitter.svg",
						href: "https://www.twitter.com",
					},
					{
						src: "icons/youtube.svg",
						href: "https://www.youtube.com",
					},
					{
						src: "icons/instagram.svg",
						href: "https://www.instagram.com",
					},
				]
				.map((args, index) =>
				(
					<Link key={index} href={args.href} target="_blank">
						<Image src={args.src} alt="social" width={20} height={20}/>
					</Link>
				))}
				</div>
			</div>
		</footer>
	);
}
