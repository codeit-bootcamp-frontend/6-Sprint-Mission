// 엑세스 토큰을 세션 스토리지에 저장
export function setAccessToken(token: string): void {
	sessionStorage.setItem('accessToken', token);
}

// 리프레시 토큰을 로컬 스토리지에 저장
export function setRefreshToken(token: string): void {
	localStorage.setItem('refreshToken', token);
}

// 엑세스 토큰을 세션 스토리지에서 가져오기
export function getAccessToken(): string | null {
	return sessionStorage.getItem('accessToken');
}

// 리프레시 토큰을 로컬 스토리지에서 가져오기
export function getRefreshToken(): string | null {
	return localStorage.getItem('refreshToken');
}

// 세션 스토리지 및 로컬 스토리지에서 토큰 삭제
export function clearTokens(): void {
	sessionStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
}
