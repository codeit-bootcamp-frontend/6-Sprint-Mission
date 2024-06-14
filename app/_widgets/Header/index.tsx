"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import useLocalStorage from "@/app/_hooks/useLocalStorage";

export default function Header(props: Readonly<{ children: { name: string; href: string; }[]; }>)
{
	const [token, set_token] = useLocalStorage<Nullable<string>>("accessToken", null);

	const pathname = usePathname();

	return (
		<header class="flex sticky top-0 z-10 bg-[#FFFFFF] border-b border-b-[#DFDFDF]">
			<div class="flex justify-between w-full h-[70px] py-[10px] mobile:mx-[16px] tablet:mx-[24px] desktop:mx-[200px] *:shrink-0">
				{/* company */}
				<Link href="/">
					<div class="flex items-center h-full gap-[10px]">
						<Image src="icons/logo_face.svg" alt="판다 얼굴" width={40} height={40} class="mobile:hidden"/>
						<Image src="icons/logo_text.svg" alt="판다 글자" width={100} height={35}/>
					</div>
				</Link>
				<div class="flex grow gap-[8px] mobile:px-[16px] tablet:px-[20px] desktop:px-[32px]">
				{/* navigation */}
				{props.children.map((args, index) =>
				(
					<Link key={index} href={args.href}>
						<div class="flex items-center justify-center font-[700] text-nowrap h-full mobile:text-[16px] tablet:text-[18px] desktop:text-[18px] tablet:px-[16px] desktop:px-[16px] tablet:min-w-[109px] desktop:min-w-[109px]" style={{ color: new RegExp("^" + args.href).test(pathname) ? "#3692FF" : "#4B5563" }}>
							{args.name}
						</div>
					</Link>
				))}
				</div>
				{/* signin */}
				{
					token
					?
					<Image src="icons/avatar.svg" alt="profile" width={40} height={40} class="aspect-square"/>
					:
					<Link href="/signin">
						<div class="button font-[500] rounded-[8px] h-full mobile:w-[88px] tablet:w-[128px] desktop:w-[128px]">
							로그인
						</div>
					</Link>
				}
			</div>
		</header>
	);
}
