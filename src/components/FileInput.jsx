import { useState, useEffect, useRef } from "react";
import "./FileInput.css";
import plusIcon from "../assets/ic_plus.png";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className='FileInput'>
      <label htmlFor='file' className='FileInput-add-button'>
        <img src={plusIcon} alt='이미지 등록' />
        <p>이미지 등록</p>
      </label>
      <input
        id='file'
        type='file'
        accept='image/png, image/jpeg'
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <div className='FileInput-img'>
          <img src={preview} alt='이미지 미리보기' />
          <button onClick={handleClearClick}>
            <span>X</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default FileInput;
