import { SignupData } from "@/interfaces/Auth.interface";

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const INPUT_RULES = {
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: EMAIL_PATTERN,
      message: "잘못된 이메일 형식입니다.",
    },
  },
  nickname: {
    required: "닉네임을 입력해주세요.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호를 8자 이상 입력해주세요.",
    },
  },
  passwordConfirmation: {
    required: true,
    validate: (value: string, formValues: SignupData) =>
      value === formValues.password || "비밀번호가 일치하지 않습니다.",
  },
};

export const LABELS = {
  email: "이메일",
  nickname: "닉네임",
  password: "비밀번호",
  passwordConfirmation: "비밀번호 확인",
};

export const PLACEHOLDER = {
  email: "이메일을 입력해주세요.",
  nickname: "닉네임을 입력해주세요.",
  password: "비밀번호를 입력해주세요.",
  passwordConfirmation: "비밀번호를 다시 한 번 입력해주세요.",
};
