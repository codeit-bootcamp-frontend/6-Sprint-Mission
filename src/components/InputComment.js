import ProductDetailStyle from "../css/ProductDetailStyle";
import { useState } from "react";

const {
  AskQuestion,
  ProductQuestionContainer,
  InputText,
  SubmitButton,
  ButtonContainer,
} = ProductDetailStyle;

const InputComments = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <ProductQuestionContainer>
        <AskQuestion htmlFor="questionId">문의하기</AskQuestion>
        <InputText
          id="questionId"
          onChange={handleInputChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
      </ProductQuestionContainer>
      <ButtonContainer>
        <SubmitButton type="submit" disabled={!inputValue}>
          등록
        </SubmitButton>
      </ButtonContainer>
    </>
  );
};
export default InputComments;
