"use client";

import { useEffect, useState, useRef } from "react";

import useBreakPoint from "@/app/_hooks/useBreakPoint";

export default function DropDown(props: Readonly<{ children: string[]; onSelect?: (item: string) => void; }>)
{
	const { is_mobile, is_tablet, is_desktop } = useBreakPoint();

	const [active, set_active] = useState(false);
	const [select, set_select] = useState(0);

	const timeout = useRef<NodeJS.Timeout>();

	useEffect(() =>
	{
		props.onSelect?.(props.children[select]);
	},
	[select]);

	return (
		<div class="group flex items-center justify-between px-[20px] relative h-[42px] w-[130px] rounded-[12px] leading-[24px] font-[400] text-[16px] border border-[#E5E7EB] mobile:w-[42px] mobile:justify-center mobile:px-0"
			onMouseEnter={(event) =>
			{
				set_active(true); timeout.current = clearTimeout(timeout.current) as undefined;
			}}
			onMouseLeave={(event) =>
			{
				timeout.current ??= setTimeout(() => set_active(false), 150);
			}}>
			{!is_mobile && props.children[select]}
			<img src={is_mobile ? "/icons/sort.svg" : "/icons/arrow_down.svg"}/>
			<div class="z-10 absolute top-full right-0 w-full mt-[5px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-[12px] mobile:w-[130px]" style={{ display: active ? undefined : "none" }}>
				{props.children.map((option, index, array) =>
				(
					<>
					<div key={option} class="flex items-center justify-center h-[42px]" onClick={() => { set_select(index); set_active(false); }}>
					{
						option
					}
					</div>
					{
						index !== array.length - 1 && <hr/>
					}
					</>
				))}
			</div>
		</div>
	);
}
