// src/api/Auth.api.ts
import instance from './Axios';
import {
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
	clearTokens,
} from '../Utils/TokenManager';

// 리프레시 토큰을 사용하여 새로운 엑세스 토큰 발급
export const refreshAccessToken = async (): Promise<void> => {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		throw new Error('No refresh token available');
	}

	try {
		const response = await instance.post('/auth/refresh-token', { refreshToken });
		const { accessToken, newRefreshToken } = response.data;

		// 새 엑세스 토큰과 리프레시 토큰 저장
		setAccessToken(accessToken);
		if (newRefreshToken) {
			setRefreshToken(newRefreshToken);
		}
	} catch (error) {
		clearTokens();
		throw error;
	}
};
