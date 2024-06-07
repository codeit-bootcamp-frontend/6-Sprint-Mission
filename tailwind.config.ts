const [$mobile, $tablet, $desktop] = [375, 768, 1200];

/* eslint-disable import/no-anonymous-default-export */
/** @type {import("tailwindcss").Config} */
export default
{
	theme:
	{
		screens:
		{
			"mobile":
			{
				min: $mobile + "px", max: ($tablet - 1) + "px"
			},
			"tablet":
			{
				min: $tablet + "px", max: ($desktop - 1) + "px"
			},
			"desktop":
			{
				min: $desktop + "px"
			},
		},
	},
	content:
	[
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins:
	[

	],
};
