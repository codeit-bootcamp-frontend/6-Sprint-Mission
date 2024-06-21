import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
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
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  type?: string;
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  onKeyDown,
  isTextArea,
  errorMessage,
  type = "text",
}) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
        />
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default InputItem;
