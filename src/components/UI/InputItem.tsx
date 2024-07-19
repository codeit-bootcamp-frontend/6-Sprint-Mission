import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import styled, { css } from "styled-components";

const inputStyle = css`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[800]};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.blue.primary};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 18px;
  }
`;

export const InputField = styled.input`
  ${inputStyle}
`;

const TextArea = styled.textarea`
  ${inputStyle}
  height: 200px;
  resize: none;
`;

export const ErrorMessage = styled.span`
  color: var(--red);
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  margin-top: 8px;
  display: block;
`;

interface InputItemProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  errorMessage?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  type?: string;
  register?: UseFormRegisterReturn; // React-Hook-Form 속성 추가
  setValue?: UseFormSetValue<any>; // React-Hook-Form 속성 추가
  trigger?: UseFormTrigger<any>; // React-Hook-Form 속성 추가
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
  isTextArea,
  errorMessage,
  type = "text",
  register,
  setValue,
  trigger,
}) => {
  const handleBlur = async (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const trimmedValue = event.target.value.trim();

    // React-hook-form을 사용하는 경우
    if (setValue && trigger) {
      setValue(id, trimmedValue);
      await trigger(id); // 필드의 유효성을 검사합니다.
    }
    // 기존 코드
    if (onBlur) {
      onBlur(event);
    }
  };

  // React-hook-form register에서 받은 onChange, onBlur 핸들러와 기존 핸들러를 합치는 함수
  const combinedRegister = register
    ? {
        ...register,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register.onChange(e);
          if (onChange) {
            onChange(e);
          }
        },
        onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register.onBlur(e);
          handleBlur(e);
        },
      }
    : {};

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          placeholder={placeholder}
          {...combinedRegister}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          {...combinedRegister}
        />
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default InputItem;
