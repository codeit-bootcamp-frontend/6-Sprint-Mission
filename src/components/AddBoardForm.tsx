import React, { ChangeEvent } from 'react';
import style from '@/styles/AddBoardForm.module.css';
export interface form {
  title: string;
  content: string;
  image: File | null;
}
interface AddBoardFormProps {
  formData: form;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddBoardForm = ({
  formData,
  onChangeHandler,
  onSubmitHandler,
}: AddBoardFormProps) => {
  return (
    <form className={style.formFrame} onSubmit={onSubmitHandler}>
      <div className={style.registerFrame}>
        <p>게시글 쓰기</p>
        <button
          type='submit'
          disabled={!(formData.title && formData.content)}
          className={style.registerBtn}
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

      <label htmlFor='file' className={style.imageRegister}>
        <p>+</p>
        <p>이미지 등록</p>
      </label>
      <input
        name='image'
        id='file'
        type='file'
        onChange={onChangeHandler}
        className={style.imageInput}
        accept='image/*'
      />
    </form>
  );
};

export default AddBoardForm;

