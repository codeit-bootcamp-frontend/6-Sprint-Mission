import Image from "next/image";
import styled from "styled-components";

export const SearchLayout = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  @media ${props => props.theme.desktop} {
    gap: 8px;
  }
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  height: 42px;
  padding: 13px 44px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colorPalette.inputBackgroundColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};
  
  &::placeholder{
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};
	}
`;

export const SearchIcon = styled(Image)`
  position: absolute;
  margin: 13px 20px;
`;

export const IconContainer = styled.div`
  width: 42px;
  height: 42px;
  padding: 9px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colorPalette.tertiary};
  margin_bottom: 24px;
  cursor: pointer;
`;
