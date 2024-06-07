import { useEffect, useState } from "react";

export default function useMediaQuery(media: string)
{
	//
	// due to a hydration mismatch
	// the initial value must be updated
	// after the very first render occurs
	//
	const [matches, set_matches] = useState(false);

	useEffect(() =>
	{
		const MediaQuery = window.matchMedia(media);
		//
		// initial update
		//
		set_matches(MediaQuery.matches);

		function listener()
		{
			set_matches(MediaQuery.matches);
		}

		MediaQuery.addEventListener("change", listener);
		return () => MediaQuery.removeEventListener("change", listener);
	},
	[media]);

	return matches;
}
