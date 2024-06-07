"use client";

import { useCallback, useEffect, useState } from "react";

import API from "@/app/_api";

import Link from "next/link";
import Image from "next/image";

import useBreakPoint from "@/app/_hooks/useBreakPoint";
import DropDown from "@/app/_widgets/DropDown";

export default function Page()
{
	const { is_mobile, is_tablet, is_desktop } = useBreakPoint();

	const [best, set_best] = useState<Awaited<ReturnType<typeof API["articles"]["GET"]>>["list"]>([]);
	const [rest, set_rest] = useState<Awaited<ReturnType<typeof API["articles"]["GET"]>>["list"]>([]);

	const [order, set_order] = useState("recent");
	const [filter, set_filter] = useState("");

	useEffect(() =>
	{
		API["articles"].GET({ page: 1, pageSize: 3, orderBy: "like" }).then((response) =>
		{
			set_best(response.list);
		});
		API["articles"].GET({ page: 1, pageSize: 10, orderBy: "recent" }).then((response) =>
		{
			set_rest(response.list);
		});
	},
	[]);

	const timestamp = useCallback((raw: string) =>
	{
		new Date()
	});

	return (
		<>
			<div class="flex flex-col mt-[24px] gap-[24px] mobile:mt-[16px] mobile:gap-[16px]">
				<div class="font-[700] text-[20px] text-[#111827]">
					베스트 게시글
				</div>
				<div class="grid gap-[24px] mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
					{best.slice(0, is_mobile ? 1 : is_tablet ? 2 : is_desktop ? 3 : 0).map((article, index) =>
					(
						<div key={index} class="flex flex-col h-[169px] px-[24px] pb-[16px] rounded-[8px] bg-[#F9FAFB]">
							<div class="flex items-center justify-center gap-[4px] w-[100px] h-[30px] bg-[#3692FF] rounded-b-[32px] font-[600] text-[16px] text-[#FFFFFF]">
								<Image src="/icons/medal.svg" width={16} height={16} alt="best"/>
								Best
							</div>
							<div class="grow flex gap-[8px] mt-[16px] font-[600] text-[20px] text-[#1F2937] mobile:text-[18px] leading-[23.87px]">
								{article.title}
								{article.image && <div class="shrink-0 w-[72px] h-[72px] p-[12px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-[8px]"><img src={article.image} alt="preview"/></div>}
							</div>
							<div class="flex justify-between mt-[18px]">
								<div class="flex items-center font-[400] text-[14px] text-[#4B5563]">
									{article.writer.nickname}
									<Image src="/icons/favorite.svg" width={16} height={16} alt="likes" class="mx-[4px] aspect-square"/>
									{article.likeCount}
								</div>
								<div class="font-[400] text-[14px] text-[#9CA3AF]">
									{new Date(article.createdAt).toLocaleDateString()}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div class="mt-[40px] mb-[136px]">
				<div class="flex justify-between font-[700] text-[20px] text-[#111827]">
					게시글
					<Link href="/post">
						<div class="button w-[88px] h-[42px] rounded-[8px] font-[600] text-[16px]">
							글쓰기
						</div>
					</Link>
				</div>
				<div class="flex items-center gap-[16px] mt-[24px] mobile:gap-[8px] mobile:mt-[16px]">
					<div class="grow flex gap-[4px] px-[16px] bg-[#F3F4F6] rounded-[12px]">
						<Image src="/icons/search.svg" width={24} height={24} alt="likes" class="aspect-square"/>
						<input placeholder="검색할 상품을 입력해주세요" class="grow h-[42px] bg-transparent outline-none" onChange={(event) => set_filter(event.target.value)}/>
					</div>
					<DropDown onSelect={(item) =>
					{
						switch (item)
						{
							case "최신순":
							{
								set_order("recent");
								break;
							}
							case "좋아요순":
							{
								set_order("like");
								break;
							}
						}
					}}>
					{[
						"최신순",
						"좋아요순",
					]}
					</DropDown>
				</div>
				<div class="flex flex-col">
					{rest.filter((article) => article.title.includes(filter)).sort((a, b) => order === "recent" ? Date.parse(b.createdAt) - Date.parse(a.createdAt) : b.likeCount - a.likeCount).map((article, index) =>
					(
						<div key={index} class="flex flex-col min-h-[136px] py-[24px] border-b border-[#E5E7EB]">
							<div class="grow flex justify-between gap-[8px] font-[600] text-[20px] text-[#1F2937] mobile:text-[18px] leading-[23.87px]">
								{article.title}
								{article.image && <div class="shrink-0 w-[72px] h-[72px] p-[12px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-[8px]"><img src={article.image} alt="preview"/></div>}
							</div>
							<div class="flex justify-between mt-[16px]">
								<div class="flex items-center gap-[8px]">
									<Image src="/icons/avatar.svg" width={24} height={24} alt="likes" class="aspect-square"/>
									<div class="flex items-center font-[400] text-[14px] text-[#4B5563]">
										{article.writer.nickname}
									</div>
									<div class="font-[400] text-[14px] text-[#9CA3AF]">
										{new Date(article.createdAt).toLocaleDateString()}
									</div>
								</div>
								<div class="flex items-center w-[60px] gap-[8px] font-[400] text-[16px] text-[#4B5563]">
									<Image src="/icons/favorite.svg" width={24} height={24} alt="likes" class="mx-[4px] aspect-square"/>
									{article.likeCount}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
