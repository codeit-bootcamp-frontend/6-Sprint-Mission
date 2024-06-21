import { useState, ChangeEvent, FocusEvent } from "react";
import styled from "styled-components";
import eyeInvisibleIcon from "../../../assets/images/icons/eye-invisible.svg";
import eyeVisibleIcon from "../../../assets/images/icons/eye-visible.svg";
import {
  ErrorMessage,
  InputField,
  Label,
} from "../../../components/UI/InputItem";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 24px;
`;

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  errorMessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>

      <InputWrapper>
        <InputField
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />

        <PasswordToggleButton
          type="button"
          onClick={togglePasswordVisibility}
          aria-label="비밀번호 보기"
        >
          <img
            className="password-toggle-icon"
            src={showPassword ? eyeVisibleIcon : eyeInvisibleIcon}
            alt={
              showPassword
                ? "비밀번호 표시 상태 아이콘"
                : "비밀번호 숨김 상태 아이콘"
            }
          />
        </PasswordToggleButton>
      </InputWrapper>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default PasswordInput;
