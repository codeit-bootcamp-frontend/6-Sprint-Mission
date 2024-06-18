import * as yup from 'yup';
import ErrorMessages from './error-message';

export const joinValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ErrorMessages.EMAIL_REQUIRED)
    .matches(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, ErrorMessages.INVALID_EMAIL),
  password: yup
    .string() //
    .required(ErrorMessages.PASSWORD_REQUIRED)
    .min(8, ErrorMessages.INVALID_PASSWORD), //
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], ErrorMessages.PASSWORDS_MUST_MATCH)
    .required(ErrorMessages.CONFIRM_PASSWORD_REQUIRED)
    .optional(),
  nickname: yup
    .string()
    .required(ErrorMessages.NICKNAME_REQUIRED) //
    .optional(),
});
