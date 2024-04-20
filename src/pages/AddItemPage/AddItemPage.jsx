import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AddItemPage.css";

const AddItemPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const location = useLocation();

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
    toggleButtonState();
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
    toggleButtonState();
  };

  const handleProductImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
    toggleButtonState();
  };

  const handleTagInputChange = (e) => {
    const tagValue = e.target.value.trim();
    if (tagValue !== "") {
      setTags([...tags, tagValue]);
      e.target.value = ""; // Clear input field after adding tag
      toggleButtonState();
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    toggleButtonState();
  };

  const toggleButtonState = () => {
    if (productName && productDescription && productImage && tags.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  return (
    <div className="add-item-container">
      <header className="page-header">
        <Link to="/" className="logo-link">
          <img src="/images/logo/logo.svg" alt="판다마켓 홈" width="153" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link
                to="/items"
                className={location.pathname === "/additem" ? "active" : ""}
                style={{ color: location.pathname === "/additem" ? "#3692FF" : "" }}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="add-item-main">
        <h1>상품 등록</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="productName">상품명</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleProductNameChange}
            placeholder="상품명을 입력하세요"
          />

          <label htmlFor="productDescription">상품 설명</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={handleProductDescriptionChange}
            placeholder="상품 설명을 입력하세요"
          ></textarea>

          <label htmlFor="productImage">상품 이미지 업로드</label>
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={handleProductImageChange}
          />

          <div className="tags-container">
            <label htmlFor="tags">태그</label>
            <input
              type="text"
              id="tags"
              placeholder="태그를 입력 후 Enter를 눌러 추가하세요"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTagInputChange(e);
                }
              }}
            />
            <div className="tags-list">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                  <button type="button" onClick={() => removeTag(index)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="button pill-button full-width"
            disabled={buttonDisabled}
          >
            등록
          </button>
        </form>
      </main>

      <footer className="page-footer">
        <div>©codeit - 2024</div>
        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </footer>
    </div>
  );
};

export default AddItemPage;
