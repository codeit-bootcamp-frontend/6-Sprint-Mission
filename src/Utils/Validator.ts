export function validateEmail(email: string): boolean {
	return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email.trim());
}

export function validateNickname(name: string): boolean {
	return name.trim().length >= 2;
}

export function validatePassword(password: string): boolean {
	return password.trim().length >= 8;
}

export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
	return password === confirmPassword;
}

export const errorMessages = {
	email: {
		empty: '이메일을 입력해주세요.',
		invalid: '잘못된 이메일 형식입니다.',
	},
	nickname: {
		empty: '닉네임을 입력해주세요.',
		invalid: '닉네임을 2자 이상 입력해주세요.',
	},
	password: {
		empty: '비밀번호를 입력해주세요.',
		invalid: '비밀번호를 8자 이상 입력해주세요.',
		match: '비밀번호가 일치하지 않습니다.',
	},
};
