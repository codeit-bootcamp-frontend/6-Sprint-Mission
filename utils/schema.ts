import * as yup from "yup";
import { LoginMessages } from "@/constants/errorMessage";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(LoginMessages.EMAIL_REQUIRED)
    .matches(
      /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
      LoginMessages.INVALID_EMAIL
    ),
  password: yup
    .string()
    .required(LoginMessages.PASSWORD_REQUIRED)
    .min(8, LoginMessages.INVALID_PASSWORD),
  passwordConfirmation: yup
    .string()
    .required(LoginMessages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref("password")], LoginMessages.PASSWORDS_MUST_MATCH),
  nickname: yup.string().required(LoginMessages.NICKNAME_REQUIRED),
});
