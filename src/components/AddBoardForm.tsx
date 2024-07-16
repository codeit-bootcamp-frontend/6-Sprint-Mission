import React, { ChangeEvent } from 'react';
import style from '@/styles/AddBoardForm.module.css';
export interface formType {
  title: string;
  content: string;
  image: File | null;
}
interface AddBoardFormProps {
  formData: formType;
  previewImage: string;
  onCancelHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddBoardForm = ({
  formData,
  previewImage,
  onChangeHandler,
  onSubmitHandler,
  onCancelHandler,
}: AddBoardFormProps) => {
  return (
    <form className={style.formFrame} onSubmit={onSubmitHandler}>
      <div className={style.registerFrame}>
        <p>게시글 쓰기</p>
        <button
          type='submit'
          disabled={!(formData.title && formData.content)}
          className={
            formData.title && formData.content
              ? `${style.registerBtn} ${style.ableBtn}`
              : `${style.registerBtn} ${style.disableBtn}`
          }
        >
          등록
        </button>
      </div>

      <p className={style.title}>*제목</p>
      <input
        name='title'
        value={formData.title}
        onChange={onChangeHandler}
        type='text'
        className={style.titleInput}
        placeholder='제목을 입력해주세요'
      />
      <p className={style.content}>*내용</p>
      <input
        name='content'
        value={formData.content}
        onChange={onChangeHandler}
        type='text'
        className={style.contentInput}
        placeholder='내용을 입력해주세요'
      />
      <p className={style.image}>이미지</p>
      <div className={style.imageFrame}>
        <label htmlFor='file' className={style.imageRegister}>
          <p>+</p>
          <p>이미지 등록</p>
        </label>
        {previewImage && (
          <div className={style.previewImageBox}>
            <div className={style.cancelBtn} onClick={onCancelHandler}>
              X
            </div>
            <img
              className={style.previewImage}
              src={previewImage}
              alt='미리보기이미지'
            />
          </div>
        )}
        <input
          name='image'
          id='file'
          type='file'
          onChange={onChangeHandler}
          className={style.imageInput}
          accept='image/*'
        />
      </div>
    </form>
  );
};

export default AddBoardForm;

