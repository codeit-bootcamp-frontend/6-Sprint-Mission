import { useEffect, useRef, useState } from "react";
import "./FileInput.css";
import placeholderImg from "./images/preview-placeholder.png";

function FileInput({ className = "", name, value, onChange }) {
  // 파일 미리보기 주소를 문자열로 저장
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

    // 사이드 이펙트 정리
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className="FileInput">
      <img className="FileRegister" src={placeholderImg} alt="이미지 등록" />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleChange}
        ref={inputRef}
      />
      {preview && (
        <img
          className="FileInput-preview"
          src={preview}
          alt="이미지 미리보기"
        />
      )}
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          x
        </button>
      )}
    </div>
  );
}

export default FileInput;
