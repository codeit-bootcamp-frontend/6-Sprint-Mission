import styled from "styled-components";

export const RoundButton = styled.button`
  display: flex;
  gap: 10px;
  padding: 12px 38px;
  border-radius: 40px;
  background-color: ${({ theme}) => theme.colorPalette.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: #fff;
  font-size: ${({ theme}) => theme.fontSize.base};
  font-weight: 600;
  line-height: 2.4rem;
`;
