import React from "react";
import styled, { css } from "styled-components";

// input과 textarea의 스타일이 대부분 중복되기 때문에 styled-components의 css 헬퍼 함수를 사용해 공통 스타일을 정의했어요.
// `${}`로 정의된 스타일을 삽입하면 여러 styled component 내에서 코드를 재사용할 수 있어요.
const inputStyle = css`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[0]};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.blue[0]};
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
  height: 200px; // 디자인에 맞춰 textarea 영역의 기본 높이를 설정해 주세요
  resize: none; // 우측 하단 코너의 textarea 영역 크기 조절 기능을 없애줍니다
`;

function InputItem({
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
}) {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown} // `onKeyPress` 이벤트는 리액트에서 더이상 지원되지 않기 때문에(deprecated) `onKeyDown` 또는 `onKeyUp`을 사용해 주세요
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default InputItem;
