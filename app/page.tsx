"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/app/_widgets/Header";
import Footer from "@/app/_widgets/Footer";

import useBreakPoint from "@/app/_hooks/useBreakPoint";

export default function Page()
{
	const { is_mobile, is_tablet, is_desktop } = useBreakPoint();

	return (
		<main class="flex flex-col items-center h-screen overflow-x-hidden *:w-full">
			<Header>
			{[
				// TODO: none
			]}
			</Header>
			{/* content */}
			<div class="grow">
				{/* banner */}
				<div class="flex flex-col items-center bg-[#CFE5FF]">
					<div class="flex flex-col relative w-full mobile:items-center mobile:px-[16px] tablet:items-center tablet:px-[24px] desktop:items-start desktop:justify-center desktop:container desktop:box-content desktop:h-[540px] desktop:px-[24px]">
						<div class="font-[700] mobile:mt-[50px] mobile:text-[32px] mobile:text-center tablet:mt-[85px] tablet:text-[40px] tablet:text-center desktop:mt-[30px] desktop:text-[40px]">
							일상의 모든 물건을
							{is_tablet ? "\u0020" : <br/>}
							거래해 보세요
						</div>
						<Link href="/items">
							<div class="button font-[600] rounded-[40px] mt-[20px] mobile:w-[155px] mobile:h-[48px] mobile:text-[16px] tablet:w-[355px] tablet:h-[60px] tablet:text-[20px] desktop:text-[20px] desktop:w-[355px] desktop:h-[60px]">
								구경하러 가기
							</div>
						</Link>
						<Image src="/images/banner_01.png" alt="banner" width={1000} height={500} class="mobile:max-w-[630px] mobile:mt-[55px] tablet:max-w-[1000px] tablet:mt-[100px] desktop:absolute desktop:left-[360px] desktop:bottom-0"/>
					</div>
				</div>
				{/* content */}
				<div class="flex flex-col items-center mobile:gap-[64px] mobile:mt-[50px] mobile:mb-[64px] tablet:gap-[64px] tablet:mt-[24px] tablet:mb-[80px] desktop:gap-[275px] desktop:mt-[140px] desktop:mb-[280px]">
					{/* segment */}
					<div class="flex flex-row text-left w-full mobile:flex-col mobile:items-start mobile:gap-[20px] mobile:px-[16px] tablet:flex-col tablet:items-start tablet:gap-[20px] tablet:px-[24px] tablet:max-w-[700px] desktop:px-[24px] desktop:gap-[64px] desktop:container desktop:box-content">
						<Image src="/images/home_01.png" alt="segment" width={600} height={450}/>
						<div class="flex flex-col justify-center">
							<div class="text-[#3692FF] font-[700] mobile:text-[16px] tablet:text-[18px] desktop:text-[18px]">
								Hot Item
							</div>
							<div class="text-[#374151] font-[700] mobile:text-[24px] mobile:mt-[8px] tablet:text-[32px] tablet:mt-[12px] desktop:text-[40px] desktop:mt-[12px]">
								인기 상품을
								{is_desktop ? <br/> : "\u0020"}
								확인해 보세요
							</div>
							<div class="text-[#374151] font-[500] mobile:text-[16px] mobile:mt-[14px] tablet:text-[18px] tablet:mt-[20px] desktop:text-[18px] desktop:mt-[24px]">
								가장 HOT한 중고거래 물품을
								<br/>
								판다 마켓에서 확인해 보세요
							</div>
						</div>
					</div>
					{/* segment */}
					<div class="flex flex-row-reverse text-right w-full mobile:flex-col mobile:items-end mobile:gap-[20px] mobile:px-[16px] tablet:flex-col tablet:items-end tablet:gap-[20px] tablet:px-[24px] tablet:max-w-[700px] desktop:px-[24px] desktop:gap-[64px] desktop:container desktop:box-content">
						<Image src="/images/home_02.png" alt="segment" width={600} height={450}/>
						<div class="flex flex-col justify-center">
							<div class="text-[#3692FF] font-[700] mobile:text-[16px] tablet:text-[18px] desktop:text-[18px]">
								Search
							</div>
							<div class="text-[#374151] font-[700] mobile:text-[24px] mobile:mt-[8px] tablet:text-[32px] tablet:mt-[12px] desktop:text-[40px] desktop:mt-[12px]">
								구매를 원하는
								{is_desktop ? <br/> : "\u0020"}
								상품을 검색하세요
							</div>
							<div class="text-[#374151] font-[500] mobile:text-[16px] mobile:mt-[14px] tablet:text-[18px] tablet:mt-[20px] desktop:text-[18px] desktop:mt-[24px]">
								구매하고 싶은 물품은 검색해서
								<br/>
								쉽게 찾아보세요
							</div>
						</div>
					</div>
					{/* segment */}
					<div class="flex flex-row text-left w-full mobile:flex-col mobile:items-start mobile:gap-[20px] mobile:px-[16px] tablet:flex-col tablet:items-start tablet:gap-[20px] tablet:px-[24px] tablet:max-w-[700px] desktop:px-[24px] desktop:gap-[64px] desktop:container desktop:box-content">
						<Image src="/images/home_03.png" alt="segment" width={600} height={450}/>
						<div class="flex flex-col justify-center">
							<div class="text-[#3692FF] font-[700] mobile:text-[16px] tablet:text-[18px] desktop:text-[18px]">
								Register
							</div>
							<div class="text-[#374151] font-[700] mobile:text-[24px] mobile:mt-[8px] tablet:text-[32px] tablet:mt-[12px] desktop:text-[40px] desktop:mt-[12px]">
								판매를 원하는
								{is_desktop ? <br/> : "\u0020"}
								상품을 등록하세요
							</div>
							<div class="text-[#374151] font-[500] mobile:text-[16px] mobile:mt-[14px] tablet:text-[18px] tablet:mt-[20px] desktop:text-[18px] desktop:mt-[24px]">
								어떤 물건이든 판매하고 싶은 상품을
								<br/>
								쉽게 등록하세요
							</div>
						</div>
					</div>
				</div>
				{/* banner */}
				<div class="flex flex-col items-center bg-[#CFE5FF]">
					<div class="flex flex-col relative w-full mobile:items-center mobile:px-[16px] tablet:items-center tablet:px-[24px] desktop:items-start desktop:justify-center desktop:container desktop:box-content desktop:h-[540px] desktop:px-[24px]">
						<div class="font-[700] mobile:mt-[120px] mobile:text-[32px] mobile:text-center tablet:mt-[200px] tablet:text-[40px] tablet:text-center desktop:text-[40px]">
							믿을 수 있는
							<br/>
							판다마켓 중고 거래
						</div>
						<Image src="/images/banner_02.png" alt="banner" width={1000} height={560} class="mobile:max-w-[500px] mobile:mt-[60px] tablet:max-w-[1000px] tablet:mt-[75px] desktop:absolute desktop:left-[360px] desktop:bottom-0"/>
					</div>
				</div>
				<Footer>
				{[
					{
						name: "Privacy Policy",
						href: "/privacy",
					},
					{
						name: "FAQ",
						href: "/faq",
					},
				]}
				</Footer>
			</div>
		</main>
	);
}
