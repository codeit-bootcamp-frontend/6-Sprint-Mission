import { useEffect } from "react";

export default function useObserver(ref: React.RefObject<HTMLElement>, ratio: number, callback: () => void, dependencies: React.DependencyList)
{
	useEffect(() =>
	{
		if (ref.current)
		{
			const observer = new IntersectionObserver((entries, observer) =>
			{
				for (const entry of entries)
				{
					if (entry.isIntersecting)
					{
						callback();
						// be gone!
						observer.disconnect();
					}
				}
			},
			{
				threshold: ratio
			});
			observer.observe(ref.current);
			return () => observer.disconnect();
		}
	},
	[ref, callback, ratio, ...dependencies]);
}
