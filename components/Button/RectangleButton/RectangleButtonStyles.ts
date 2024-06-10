import styled from "styled-components";

export const Button = styled.button`
  height: 42px;
  padding: 12px 23px;
  border-radius: 8px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colorPalette.inputPlaceholderColor : theme.colorPalette.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.9rem;
`;