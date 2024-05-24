import styled, { css } from "styled-components";
import { ChangeEvent, KeyboardEvent } from "react";

const inputStyle = css`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${{ theme }} => theme.colors.gray[800]};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;


`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
`;
const InputField = styled.input`
    ${inputStyle}
`
const TextArea = styled.textarea`
    ${inputStyle}
    height: 200px;
`;
interface InputItemProps {
    id: string;
    label?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    isTextArea?: boolean;

};

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
      {label && <Label htmlFor={id}>{label}</Label>}
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
}

export default InputItem;
