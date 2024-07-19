import * as yup from 'yup';

import Messages from './Message';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(Messages.EMAIL_REQUIRED)
    .matches(/^\w+@\w+\.com$/, Messages.INVALID_EMAIL),
  password: yup
    .string()
    .required(Messages.PASSWORD_REQUIRED)
    .min(8, Messages.INVALID_PASSWORD),
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required(Messages.EMAIL_REQUIRED)
    .matches(/^\w+@\w+\.com$/, Messages.INVALID_EMAIL),
  password: yup
    .string()
    .required(Messages.PASSWORD_REQUIRED)
    .min(8, Messages.INVALID_PASSWORD),
  passwordConfirmation: yup
    .string()
    .required(Messages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('password')], Messages.PASSWORDS_MUST_MATCH),
  nickname: yup.string().required(Messages.NICKNAME_REQUIRED),
});
