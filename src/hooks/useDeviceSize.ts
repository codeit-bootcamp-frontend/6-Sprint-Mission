import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

/**
 * 디바이스 사이즈를 반환하는 함수
 * - mobile: 768px 미만
 * - tablet: 768px 이상 1200px 이하
 * - desktop: 1200px 초과
 * @function getDeviceSize
 * @example
 * const deviceSize = getDeviceSize();
 * console.log(deviceSize); // 'mobile' | 'tablet' | 'desktop'
 * @returns {('mobile' | 'tablet' | 'desktop')}
 */
const getDeviceSize = () => {
	if (typeof window !== 'undefined') {
		const screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			return 'mobile';
		} else if (screenWidth <= 1200) {
			return 'tablet';
		} else {
			return 'desktop';
		}
	}
	return 'desktop'; // 기본 값
};

/**
 * 디바이스 사이즈를 반환하는 훅
 * - mobile: 768px 미만
 * - tablet: 768px 이상 1200px 이하
 * - desktop: 1200px 초과
 * @returns {('mobile' | 'tablet' | 'desktop')}
 * @function useDeviceSize
 * @example
 * const deviceSize = useDeviceSize();
 * console.log(deviceSize); // 'mobile' | 'tablet' | 'desktop'
 */
const useDeviceSize = () => {
	const [deviceSize, setDeviceSize] = useState('desktop');

	useEffect(() => {
		const handleResize = throttle(() => {
			setDeviceSize(getDeviceSize());
		}, 200);

		window.addEventListener('resize', handleResize);
		handleResize(); // 초기 사이즈 설정

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return deviceSize;
};

export default useDeviceSize;
