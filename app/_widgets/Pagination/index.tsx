import { createContext, useContext, useState } from "react";

import capsule from "@/app/_models/capsule";

interface Context
{
	props:
	{
		page: number;
		clamp: number;
		length: number;
	};
	state:
	{
		page: ReturnType<typeof capsule<number>>;
	};
}

// @ts-ignore
const Context = createContext<Context>();

// TODO: pass id, class, style
export default function Pagination(props: Readonly<Props & Context["props"]>)
{
	const [page, set_page] = useState(props.page);

	return (
		<Context.Provider value={
		{
			props:
			{
				page: props.page,
				clamp: props.clamp,
				length: props.length,
			},
			state:
			{
				page: capsule(() => page, (value: number) => set_page(Math.min(Math.max(0, value), props.length - 1))),
			}
		}}>
		<div id={props.id} class={props.class} style={props.style}>
		{
			props.children
		}
		</div>
		</Context.Provider>
	)
}

Pagination.Button = function Button(props: Readonly<Props & { to: ("first" | "prev" | "next" | "last" | number); }>)
{
	const ctx = useContext(Context);

	return (
		<div id={props.id} class={props.class} style={props.style} onClick={() =>
		{
			switch (props.to)
			{
				case "first":
				{
					ctx.state.page(-Infinity);
					break;
				}
				case "prev":
				{
					ctx.state.page(ctx.state.page() - 1);
					break;
				}
				case "next":
				{
					ctx.state.page(ctx.state.page() + 1);
					break;
				}
				case "last":
				{
					ctx.state.page(+Infinity);
					break;
				}
				default:
				{
					ctx.state.page(props.to);
					break;
				}
			}
		}
		}>
		{
			props.children
		}
		</div>
	);
};

Pagination.Generator = function Generator(props: Readonly<{ render: (key: number, page: number, highlight: boolean) => Props["children"]; }>)
{
	const ctx = useContext(Context);

	return (
		<>
		{
			new Array(Math.min(ctx.props.length, ctx.props.clamp)).fill(null).map((_, index) =>
			{
				// TODO: optimize logic & reuse cached value
				const page = index + (ctx.state.page() > Math.floor(ctx.props.clamp / 2) && ctx.props.length > ctx.props.clamp ? Math.abs(ctx.state.page() - Math.floor(ctx.props.clamp / 2)) + (ctx.props.clamp + Math.abs(ctx.state.page() - Math.floor(ctx.props.clamp / 2)) > ctx.props.length ? ctx.props.length - (ctx.props.clamp + Math.abs(ctx.state.page() - Math.floor(ctx.props.clamp / 2))) : 0) : 0);
				
				return props.render(index, page, page === ctx.state.page());
			})
		}
		</>
	);
};
