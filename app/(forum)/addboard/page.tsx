"use client";

import API from "@/app/_api";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { useRef, useState, useCallback } from "react";

export default function Page()
{
	const router = useRouter();

	const ref_title = useRef<Nullable<HTMLInputElement>>(null);
	const ref_content = useRef<Nullable<HTMLTextAreaElement>>(null);

	const [post_imgs, set_post_imgs] = useState<File[]>([]);
	const [preview_imgs, set_preview_imgs] = useState<FileReader["result"][]>([]);

	const [disabled, set_disabled] = useState(true);

	const upload = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
	{
		const file = event.target.files!![0];

		set_post_imgs((post_imgs) => [...post_imgs, file]);

		const reader = new FileReader();

		reader.addEventListener("load", (event) =>
		{
			set_preview_imgs((preview_imgs) => [...preview_imgs, reader.result]);
		});
	
		reader.readAsDataURL(file);
	},
	[]);

	const unload = useCallback((index: number) =>
	{
		set_post_imgs((post_imgs) => post_imgs.toSpliced(index, 1));
		set_preview_imgs((preview_imgs) => preview_imgs.toSpliced(index, 1));
	},
	[]);

	const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
	{
		for (const ref of [ref_title, ref_content])
		{
			if (ref.current?.value.length === 0) return set_disabled(true);
		}
		return set_disabled(false);
	},
	[]);

	const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) =>
	{
		API["articles"].POST({ title: ref_title.current?.value!!, content: ref_content.current?.value!!, image: preview_imgs[0] as string }, { "Authorization": `Bearer ${document.cookie}` }).then((response) =>
		{
			router.push(`/addboard/${response.id}`)
		});
		event.preventDefault();
	},
	[router, preview_imgs]);

	return (
		<>
			<form class="flex flex-col gap-[24px]" onSubmit={onSubmit}>
				<div class="flex items-center justify-between mt-[24px] mobile:mt-[16px]">
					<div class="font-[700] text-[20px] text-[#1F2937]">
						게시글 쓰기
					</div>
					<button class="button w-[74px] h-[42px] rounded-[8px]" type="submit" disabled={disabled}>
						등록
					</button>
				</div>
				<div class="flex flex-col gap-[12px]">
					<label for="title" class="font-[700] text-[18px] text-[#1F2937] mobile:text-[14px]">
						*제목
					</label>
					<div class="flex bg-[#F3F4F6] rounded-[12px]">
						<input ref={ref_title} id="title" placeholder="제목을 입력해주세요" class="grow bg-transparent outline-none px-[24px] py-[16px] font-[600] text-[16px] placeholder:font-[400]" onChange={onChange}/>
					</div>
				</div>
				<div class="flex flex-col gap-[12px]">
					<label for="content" class="font-[700] text-[18px] text-[#1F2937] mobile:text-[14px]">
						*내용
					</label>
					<div class="flex bg-[#F3F4F6] rounded-[12px]">
						<textarea ref={ref_content} id="content" rows={1} placeholder="내용을 입력해주세요" class="grow h-auto min-h-[200px] bg-transparent outline-none px-[24px] py-[16px] font-[600] text-[16px] resize-none placeholder:font-[400]" onChange={(event) => { event.target.style.height = "auto"; event.target.style.height = event.target.scrollHeight + "px"; onChange(event); }}/>
					</div>
				</div>
				<div class="flex flex-col gap-[12px]">
					<label for="image" class="font-[700] text-[18px] text-[#1F2937] mobile:text-[14px]">
						이미지
					</label>
					<div class="grid grid-cols-4 gap-[24px] tablet:gap-[16px] mobile:gap-[8px] mobile:grid-cols-2 *:aspect-square *:flex *:flex-col *:items-center *:justify-center *:gap-[12px] *:font-[400] *:text-[16px] *:text-[#9CA3AF] *:bg-[#F3F4F6] *:rounded-[12px]">
						<label for="image">
							<Image src="/icons/plus.svg" alt="icon" width={48} height={48}/>
							이미지 등록
							<input id="image" type="file" accept=".png,.jpg,.jpeg,.webp" multiple={false} class="hidden" onChange={(event) => upload(event)}/>
						</label>
						{preview_imgs.map((src, index) =>
						(
							<div key={index} style={{ backgroundImage: `url("${src}")` }} class="relative bg-center bg-cover">
								<Image src="/icons/close.svg" alt="icon" width={24} height={24} class="absolute top-[10px] right-[10px] p-[6px] bg-[#9CA3AF] rounded-full" onClick={() => unload(index)}/>
							</div>
						))}
					</div>
				</div>
			</form>
		</>
	);
}
