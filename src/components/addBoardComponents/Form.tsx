import { labelBasicStyle } from "@/css/common/sign.styled";
import { inputRecipe } from "@/css/recipe/inputRecipe.styled";
import { css, cx } from "@/styled-system/css";
import { formStyle, labelInput } from "./form.styled";
import Image, { StaticImageData } from "next/image";
import imageAdd from "@/assets/images/image-add.png";
import { useEffect, useState } from "react";

export interface PostData {
  content: string;
  title: string;
  image?: null | Blob | MediaSource;
}

interface FormProps {
  postData: PostData;
  file?: Blob | MediaSource;
  onChangeInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Form({ postData, file, onChangeInput, onChangeImage }: FormProps) {
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(imageAdd);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <div className={cx(formStyle, css({ marginTop: "24px" }))}>
      <div className={labelInput}>
        <label className={labelBasicStyle}>*제목</label>
        <input
          name="title"
          type="text"
          value={postData.title}
          onChange={onChangeInput}
          className={inputRecipe()}
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div className={labelInput}>
        <label className={labelBasicStyle}>*내용</label>
        <textarea
          name="content"
          value={postData.content}
          onChange={onChangeInput}
          className={inputRecipe({ visual: "xLarge" })}
          placeholder="내용을 입력해주세요"
        />
      </div>
      <div className={labelInput}>
        <label className={labelBasicStyle}>이미지</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onChangeImage}
          className={css({ display: "none" })}
          id="image-upload"
        />
        <label htmlFor="image-upload" className={css({ cursor: "pointer" })}>
          <Image
            src={imageUrl}
            alt="이미지 등록하기"
            width={240}
            height={240}
            className={css({
              w: { xl: "282px" },
              cursor: "pointer",
              borderRadius: "12px",
            })}
          />
        </label>
      </div>
    </div>
  );
}

export default Form;
