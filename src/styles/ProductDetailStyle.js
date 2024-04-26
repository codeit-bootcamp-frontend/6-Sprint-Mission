import styled, { css } from "styled-components";

const ProductDetailStyle = {
  ProductDetailContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: row;
    padding: 30px 140px;

    //모바일
    @media (max-width: 767px) {
      padding: 3px 5px;
      font-family: Pretendard;
      font-size: 32px;
      font-weight: 600;
      line-height: 38.19px;
      text-align: left;
      display: flex;
      flex-direction: column;
    }
    //테블릿
    @media (max-width: 1200px) {
      padding: 20px 30px;
      font-family: Pretendard;
      font-size: 32px;
      font-weight: 600;
      line-height: 38.19px;
      text-align: left;
    }
  `,

  ProductImageContainer: styled.div`
    width: 100%;
    max-width: 600px;
    margin-right: 15px;
  `,

  ProductImage: styled.img`
    width: 486px;
    height: 486px;
    border-radius: 16px;

    border: 0.3px solid #ccc;

    @media (max-width: 1023px) {
      width: 340px;
      height: 340px;
    }

    @media (max-width: 767px) {
      width: 100%;
      height: 345px;
    }
  `,

  ProductInfoContainer: styled.div`
  width: 100%;
  max-width: 690px;
  height: 100%  
  gap: 0px;
  justify: space-between;
  opacity: 0px;
  @media (max-width: 767px) {
    margin-top:15px;
  }
  
`,
  TagTitle: styled.div`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    text-align: left;
  `,
  ProductTitle: styled.div`
    display: flex;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 600;
    line-height: 28.64px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 20px;
    justify-content: space-between;

    //모바일
    @media (max-width: 767px) {
      font-family: Pretendard;
      font-size: 32px;
      font-weight: 600;
      line-height: 38.19px;
      text-align: left;
    }
    //테블릿
    @media (max-width: 1200px) {
      font-family: Pretendard;
      font-size: 20px;
      font-weight: 600;
      line-height: 23.87px;
      text-align: left;
    }
  `,

  ProductPrice: styled.p`
    font-family: Pretendard;
    font-size: 40px;
    font-weight: 600;
    line-height: 47.73px;
    text-align: left;
    font-color: #1f2937;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 30px;

    //모바일
    @media (max-width: 767px) {
      font-family: Pretendard;
      font-size: 32px;
      font-weight: 600;
      line-height: 38.19px;
      text-align: left;
    }
    //테블릿
    @media (max-width: 1200px) {
      font-family: Pretendard;
      font-size: 32px;
      font-weight: 600;
      line-height: 38.19px;
      text-align: left;
    }
  `,

  ProductDescription: styled.div`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px;
    text-align: left;
    padding-top: 20px;
    font-color: #1f2937;
    padding-bottom: 20px;
  `,

  LikeCount: styled.p`
    width: 87px;
    height: 40px;
    padding: 10px 22px;
    gap: 10px;
    border-radius: 35px;
    border: 1px;
    border: 1px solid #e5e7eb;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 700;
    //모바일
    @media (max-width: 767px) {
      padding: 5px 15px;
    }
    //테블릿
    @media (max-width: 1200px) {
      padding: 1px 15px;
    }
  `,
  TagText: styled.span`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,
  TagItem: styled.div`
    display: flex;
    align-items: center;
    background-color: #f3f4f6;
    color: #333;
    padding: 5px 10px;
    border-radius: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
  `,

  TagList: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 140px;

    // 태블릿
    @media (max-width: 1023px) {
      margin-bottom: 60px;
    }
  `,

  AskQuestion: styled.label`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 19.09px;
    text-align: left;
  `,
  ProductQuestionContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding-top: 30px;
    padding-left: 140px;
    padding-right: 140px;

    @media (max-width: 767px) {
      padding-left: 5px;
      padding-right: 5px;
    }
    @media (max-width: 1200px) {
      padding: 20px 30px;
    }
  `,
  InputText: styled.textarea`
    width: 100%;
    height: 104px;
    margin-top: 20px;
    background: #f3f4f6;
    border-radius: 12px;
    border: 0.5px solid #ccc;
    padding: 15px 30px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    text-align: start;
    font-color: #9ca3af;
    margin-bottom: 20px;
    resize: none;

    &:focus {
      border: 1px solid #3692ff;
      outline: none;
    }

    //모바일
    @media (max-width: 767px) {
      width: 100%;
      height: 104px;
      padding: 16px 24px 16px 24px;
      border-radius: 12px;
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      margin-bottom: 0px;
    }
    //테블릿
    @media (max-width: 1200px) {
      padding: 20px 30px;
      width: 100%;
      height: 104px;
      padding: 16px 24px 16px 24px;
      border-radius: 12px;
      font-family: Pretendard;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 0px;
    }
  `,

  SubmitButton: styled.button`
    justify-content: center;
    align-items: center;
    width: 74px;
    height: 42px;
    padding: 12px 22px 12px 22px;
    gap: 10px;
    border: none;
    border-radius: 15px;
    background: #3692ff;
    color: #ffffff;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;

    ${(props) =>
      props.disabled &&
      css`
        background-color: #9ca3af;
        color: #ffffff;
        cursor: not-allowed;
      `}
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: row-reverse;
    padding: 0px 140px;
    //모바일
    @media (max-width: 767px) {
      padding-left: 5px;
      padding-right: 5px;
    }
    //테블릿
    @media (max-width: 1200px) {
      padding-left: 30px;
      padding-right: 30px;
    }
  `,
};

export default ProductDetailStyle;
