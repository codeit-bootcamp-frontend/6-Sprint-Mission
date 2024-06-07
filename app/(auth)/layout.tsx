import Link from "next/link";
import Image from "next/image";

export default function Layout(props: Readonly<Pick<Props, "children">>)
{
	return (
		<main class="flex flex-col items-center h-screen overflow-x-hidden *:w-full">
			{/* logo */}
			<Link href="/">
				<Image src="/icons/logo.svg" alt="logo" width={400} height={130} class="mx-auto mobile:mt-[24px] tablet:mt-[48px] desktop:mt-[60px]"/>
			</Link>
			{/* content */}
			<article class="mobile:w-full mobile:px-[16px] mobile:mt-[24px] tablet:w-[640px] tablet:mt-[40px] desktop:w-[640px] desktop:mt-[40px]">
			{
				props.children
			}
			</article>
		</main>
	);
}
