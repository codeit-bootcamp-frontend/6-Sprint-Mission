import "react";

/** @see https://github.com/facebook/react/issues/13525 */
declare module "react"
{
	interface LabelHTMLAttributes<HTMLLabelElement>
	{
		for?: string;
	}
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T>
	{
		class?: string;
	}
}

declare global
{
	interface Props
	{
		id?: string; style?: React.CSSProperties; class?: string; children?: React.ReactNode;
	}
}

export {};
