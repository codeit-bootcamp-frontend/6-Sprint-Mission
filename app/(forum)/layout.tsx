import Header from "@/app/_widgets/Header";

export default function Layout(props: Readonly<Pick<Props, "children">>)
{
	return (
		<main class="flex flex-col items-center h-screen overflow-x-hidden *:w-full">
			<Header>
			{[
				{
					name: "자유게시판", href: "/boards",
				},
				{
					name: "중고마켓", href: "/items",
				},
			]}
			</Header>
			<article class="grow mobile:px-[16px] tablet:px-[24px] desktop:px-[24px] desktop:container desktop:box-content">
				{props.children}
			</article>
		</main>
	);
}
