"use client";

import Pagination from "@/app/_widgets/Pagination";

export default function Page()
{
	return (
		<>
			<Pagination page={0} clamp={5} length={10} class="flex gap-[10px] *:flex *:items-center *:justify-center *:w-[40px] *:h-[40px] *:rounded-[8px] *:bg-blue-500">
				<Pagination.Button to="prev">
					이전
				</Pagination.Button>
				<Pagination.Generator render={(key, page, highlight) =>
				(
					<Pagination.Button key={key} to={page} style={{ background: highlight ? "blue" : undefined }}>
					{
						page + 1
					}
					</Pagination.Button>
				)}/>
				<Pagination.Button to="next">
					다음
				</Pagination.Button>
			</Pagination>
		</>
	);
}
