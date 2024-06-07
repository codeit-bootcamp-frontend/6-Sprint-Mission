"use client";

import API from "@/app/_api";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useParams } from "next/navigation";

export default function Page()
{
	const { id } = useParams();

	const [article, set_article] = useState<Awaited<ReturnType<typeof API["articles/{articleId}"]["GET"]>>>();
	const [comments, set_comments] = useState<Awaited<ReturnType<typeof API["articles/{articleId}/comments"]["GET"]>>["list"]>([]);

	const [my_comment, set_my_comment] = useState("");

	useEffect(() =>
	{
		API["articles/{articleId}"].GET({ articleId: Number(id) }).then((response) =>
		{
			set_article(response);
		});
		API["articles/{articleId}/comments"].GET({ articleId: Number(id), limit: 3 }).then((response) =>
		{
			set_comments(response.list);
		});
	},
	[id]);

	const post_comment = useCallback((event: React.FormEvent<HTMLFormElement>) =>
	{
		API["articles/{articleId}/comments"].POST({ articleId: Number(id), content: my_comment }, { "Authorization": `Bearer ${document.cookie}` }).then((response) =>
		{
			set_comments((comments) => [...comments, response]);
		});
		event.preventDefault();
	},
	[id, my_comment]);

	if (!article)
	{
		return (<>불러오는중...</>);
	}
	return (
		<>
			<div class="flex flex-col gap-[16px] mt-[24px] pb-[16px] border-b-[1px] border-[#E5E7EB] desktop:mt-[32px]">
				<div class="flex justify-between font-[700] text-[#1F2937] text-[20px]">
					{
						article.title
					}
					<Image src="/icons/kebab.svg" width={24} height={24} alt="likes" class="aspect-square"/>
				</div>
				<div class="flex">
					<div class="flex gap-[8px] items-center">
						<Image src="/icons/avatar.svg" width={24} height={24} alt="likes" class="aspect-square"/>
						<div class="font-[400] text-[14px] text-[#4B5563]">
						{
							article.writer.nickname
						}
						</div>
						<div class="font-[400] text-[12px] text-[#9CA3AF]">
						{
							new Date(article.createdAt).toLocaleDateString()
						}
						</div>
					</div>
					<div class="w-[1px] mx-[16px] bg-[#E5E7EB]"/>
					<div class="flex gap-[4px] items-center">
						<Image src="/icons/favorite.svg" width={24} height={24} alt="likes" class="p-[5px] aspect-square"/>
						<div class="font-[400] text-[14px] text-[#9CA3AF]">
						{
							article.likeCount
						}
						</div>
					</div>
				</div>
			</div>
			<div class="mt-[16px] font-[400] text-[16px] text-[#1F2937] leading-[24px]">
			{
				article.content
			}
			</div>
			<form class="flex flex-col gap-[16px] mt-[64px] mobile:mt-[40px]" onSubmit={post_comment}>
				<label for="comment" class="font-[600] text-[16px] text-[#111827]">
					댓글 달기
				</label>
				<div class="flex bg-[#F3F4F6] rounded-[12px]">
					<textarea id="comment" placeholder="댓글을 입력해주세요" class="grow min-h-[104px] px-[24px] py-[16px] bg-transparent outline-none resize-none font-[400] text-[16px] leading-[24px] placeholder:text-[#9CA3AF]" onChange={(event) => { event.target.style.height = "auto"; event.target.style.height = event.target.scrollHeight + "px"; set_my_comment(event.target.value); }}/>
				</div>
				<div class="flex justify-end">
					<button type="submit" disabled={!(0 < my_comment.length)} class="button h-[42px] px-[24px] rounded-[8px]">
						등록
					</button>
				</div>
			</form>
			{(() =>
			{
				if (0 < comments.length)
				{
					return (
						<div class="flex flex-col gap-[24px] mt-[24px] mobile:mt-[16px] mobile:gap-[16px]">
						{comments.map((comment, index) =>
						(
							<div key={index} class="flex flex-col pb-[24px] gap-[24px] mobile:gap-[16px] mobile:pb-[24px] border-b-[1px] border-[#E5E7EB]">
								<div class="flex justify-between">
									{
										comment.content
									}
									<Image src="/icons/kebab.svg" width={24} height={24} alt="likes" class="aspect-square"/>
								</div>
								<div class="flex items-center gap-[8px]">
									<Image src="/icons/avatar.svg" width={32} height={32} alt="likes" class="aspect-square"/>
									<div class="flex flex-col gap-[4px]">
										<div class="font-[400] text-[12px] text-[#4B5563]">
										{
											comment.writer.nickname
										}
										</div>
										<div class="font-[400] text-[12px] text-[#9CA3AF]">
										{
											comment.createdAt
										}
										</div>
									</div>
								</div>
							</div>
						))}
						</div>
					)
				}
				else
				{
					return (
						<div class="flex flex-col items-center gap-[40px] mt-[20px] mobile:gap-[20px] desktop:mt-0">
							<div class="flex flex-col gap-[7px] items-center">
								<Image src="/images/no_comments.png" alt="no comments" width={140} height={140}/>
								<div class="font-[400] text-center text-[16px] text-[#9CA3AF] leading-[24px]">
									아직 댓글이 없어요
									<br/>
									지금 댓글을 달아보세요
								</div>
							</div>
							<Link href="/boards" class="button h-[48px] px-[38.5px] rounded-[40px]">
								목록으로 돌아가기
								<Image src="/icons/return.svg" width={24} height={24} alt="return" class="aspect-square"/>
							</Link>
						</div>
					);
				}
			})()}
		</>
	);
}
