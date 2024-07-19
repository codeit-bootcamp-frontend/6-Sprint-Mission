import { subTitle } from "@/css/common/text.styled";
import { buttonRecipe } from "@/css/recipe/buttonRecipe.styled";
import { hstack } from "@/styled-system/patterns";
import { MouseEventHandler } from "react";

interface FormTitleProps {
  isValid: boolean;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

function FormTitle({ isValid, handleSubmit }: FormTitleProps) {
  return (
    <div className={hstack({ justifyContent: "space-between" })}>
      <h2 className={subTitle}>게시글 쓰기</h2>
      <button
        className={buttonRecipe({ visual: isValid ? "small" : "large" })}
        onClick={handleSubmit}
      >
        글쓰기
      </button>
    </div>
  );
}

export default FormTitle;
