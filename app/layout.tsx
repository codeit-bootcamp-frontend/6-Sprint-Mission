import "./globals.css";

export default function Layout(props: Readonly<Pick<Props, "children">>)
{
	return (
		<html>
			<body>
				{props.children}
			</body>
	  	</html>
	);
}

/** @type {import("next").Metadata} */
export const metadata = { title: "판다마켓", description: "당근마켓이 아니에요" };
