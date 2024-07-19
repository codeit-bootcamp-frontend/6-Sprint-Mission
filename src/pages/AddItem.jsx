import { useState } from "react";
import InputTitle from "../components/InputTitle";
import "./AddItem.css";
import FileInput from "../components/FileInput";

const INITIAL_VALUES = {
  imgFile: null,
  name: "",
  desc: "",
  price: "",
  tag: "",
};

function AddItem() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (name, value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit} className='AddItem-form'>
      <div className='AddItem-title'>
        <h1>상품 등록하기</h1>
        <button type='submit'>등록</button>
      </div>
      <div className='AddItem-file'>
        <InputTitle name='상품 이미지' />
        <FileInput
          name='imgFile'
          value={values.imgFile}
          onChange={handleChange}
        />
      </div>
      <div className='AddItem-name'>
        <InputTitle name='상품명' />
        <input
          value={values.name}
          name='name'
          type='text'
          placeholder='상품명을 입력해주세요'
          onChange={handleInputChange}
        />
      </div>
      <div className='AddItem-desc'>
        <InputTitle name='상품 소개' />
        <textarea
          value={values.desc}
          name='desc'
          type='text'
          placeholder='상품 소개를 입력해주세요'
          onChange={handleInputChange}
        />
      </div>
      <div className='AddItem-price'>
        <InputTitle name='판매가격' />
        <input
          value={values.price}
          name='price'
          type='text'
          placeholder='판매 가격을 입력해주세요'
          onChange={handleInputChange}
        />
      </div>
      <div className='AddItem-tag'>
        <InputTitle name='태그' />
        <input
          value={values.tag}
          name='tag'
          type='text'
          placeholder='태그를 입력해주세요'
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}

export default AddItem;
