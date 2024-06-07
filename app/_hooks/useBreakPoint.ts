import useMediaQuery from "./useMediaQuery";

export default function useBreakPoint()
{
	return {
		is_mobile: useMediaQuery("(375px <= width < 768px)"), is_tablet: useMediaQuery("(768px <= width < 1200px)"), is_desktop: useMediaQuery("(1200px <= width)"),
	};
}
