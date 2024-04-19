import React, { useState, useEffect } from "react";
import "./AddItemSection.css";

function AddItemSection() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [inputValues, setInputValues] = useState({
    name: "",
    desc: "",
    price: "",
    tag: ""
  });

  useEffect(() => {
    const button = document.querySelector(".regis-button");

    const checkInputValues = () => {
      if (
        inputValues.name &&
        inputValues.desc &&
        inputValues.price &&
        inputValues.tag
      ) {
        button.style.backgroundColor = "#3692FF"; 
      } else {
        button.style.backgroundColor = "";
      }
    };

    checkInputValues();

    return () => {
      document.removeEventListener("input", checkInputValues);
    };
  }, [inputValues]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImagePreviews((prevPreviews) => [...prevPreviews, imageData]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);
  };

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="regis-div">
        <div className="regis-text">상품 등록하기</div>
        <a href="/items" className="regis-button">
          등록
        </a>
      </div>
      <div className="image-div">
        <div>
          <div className="image-text">상품 이미지</div>
          <label htmlFor="upload-btn" className="upload-btn">
            <input
              type="file"
              id="upload-btn"
              className="input-file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            <div className="upload-btn-plus">+</div>
            <div className="upload-btn-regis">이미지 등록</div>
          </label>
        </div>
        {imagePreviews.map((preview, index) => (
          <div key={index} className="image-preview">
            <img src={preview} alt="Preview" className="preview-image" />
            <button onClick={() => removeImage(index)}>x</button>
          </div>
        ))}
      </div>
      <div className="name-div">
        <div className="name-text">상품명</div>
        <input
          className="name-input"
          placeholder="     상품명을 입력해주세요"
          name="name"
          value={inputValues.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="desc-div">
        <div className="desc-text">상품 소개</div>
        <input
          className="desc-input"
          placeholder="     상품 소개를 입력해주세요"
          name="desc"
          value={inputValues.desc}
          onChange={handleInputChange}
        />
      </div>
      <div className="price-div">
        <div className="price-text">판매가격</div>
        <input
          className="price-input"
          placeholder="     판매 가격을 입력해주세요"
          name="price"
          value={inputValues.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="tag-div">
        <div className="tag-text">태그</div>
        <input
          className="tag-input"
          placeholder="     태그를 입력해주세요"
          name="tag"
          value={inputValues.tag}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default AddItemSection;
