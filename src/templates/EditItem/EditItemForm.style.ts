import styled, { css } from "styled-components";
import { onPc, onTablet, onTabletAndPc } from "styles/mediaQuery";
import COLORS from "styles/palette";

export const EditItemContainer = styled.div`
  margin-top: 16px;
`;

export const EditItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${COLORS.COOL_GRAY_800};

    ${onTabletAndPc} {
      font-size: 28px;
    }
  }
`;

const formLabel = css`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 700;
  color: ${COLORS.COOL_GRAY_800};

  ${onTabletAndPc} {
    font-size: 18px;
  }
`;

export const EditItemForm = styled.form`
  .form__image,
  .form__description,
  .form__price,
  .form__tags {
    margin-top: 16px;
    & > h1 {
      ${formLabel}
    }
  }

  .form__productName {
    margin-top: 16px;

    ${onTablet} {
      margin-top: 23px;
    }

    ${onPc} {
      margin-top: 47px;
    }

    & > h1 {
      ${formLabel}
    }
  }
`;
