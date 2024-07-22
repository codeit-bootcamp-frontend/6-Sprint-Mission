import styled from "styled-components";
import DefaultButton from "../../../common/DefaultButton";

// AddItemPage.js
export const Wrapper = styled.form`
  margin: 24px 0 170px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled.p`
  font-size: 28px;
  font-weight: 700;
  line-height: 33.41px;
  color: var(--main-text-color);

  @media ${(props) => props.theme.mobile} {
    font-size: 20px;
    line-height: 23.87px;
  }
`;

export const StyledButton = styled(DefaultButton)`
  line-height: 19.09px;
  background-color: var(--main-color);

  &:disabled {
    background-color: var(--placeholder-color);
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  padding-left: 24px;
  background-color: var(--input-background-color);

  &::placeholder {
    color: var(--placeholder-color);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  padding: 16px 0 0 24px;
  background-color: var(--input-background-color);

  &::placeholder {
    color: var(--placeholder-color);
  }
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 21.48px;
  color: var(--main-text-color);
  margin-bottom: 12px;

  @media ${(props) => props.theme.mobile} {
    font-size: 14px;
    line-height: 16.71px;
  }
`;
