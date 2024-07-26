export const ERROR_MESSAGE = {
  emailRequired: '이메일을 입력해주세요.',
  invalidEmail: '유효한 이메일 주소를 입력해주세요.',

  nicknameRequired: '닉네임을 입력해주세요.',

  passwordRequired: '비밀번호를 입력해주세요.',
  passwordLength: (minLength: number) =>
    `비밀번호를 ${minLength}자 이상 입력해주세요.`,
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
} as const;
