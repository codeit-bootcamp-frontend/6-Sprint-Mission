import React, { ChangeEvent, KeyboardEvent } from "react";
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

const InputField = styled.input`
  ${inputStyle}
`;

const TextArea = styled.textarea`
  ${inputStyle}
  height: 200px;
  resize: none;
`;

interface InputItemProps {
  id: string;
  label?: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
}) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputItem;
