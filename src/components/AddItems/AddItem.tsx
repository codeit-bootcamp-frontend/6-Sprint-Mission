import "../../style/additem.css";
import React, { useCallback, useEffect, useState } from "react";
import ic_x_gray from "../../assets/icon/ic_x_gray.svg";
import ic_x_blue from "../../assets/icon/ic_x_blue.svg";

export default function AddItem() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isAllInputFilled, setIsAllInputFilled] = useState<boolean>(false);
  const [inputPrice, setInputPrice] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputDes, setInputDes] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState<string>("");
  const [imageHovered, setImageHovered] = useState<boolean>(false);
  const [tagHovered, setTagHovered] = useState<boolean[]>(Array(10).fill(false));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setImageSrc(result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function Commas(n: string) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value.replace(/\D/g, "");
    const formattedPrice = Commas(price);
    setInputPrice(formattedPrice);
    handleInputChange();
  };

  const handleInputChange = useCallback(() => {
    const isFilled =
      inputName.trim() !== "" &&
      inputDes.trim() !== "" &&
      inputPrice.trim() !== "" &&
      tags.length > 0;
    setIsAllInputFilled(isFilled);
  }, [inputName, inputDes, inputPrice, tags]);

  useEffect(() => {
    handleInputChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    handleInputChange();
  };

  const handleDesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputDes(e.target.value);
    handleInputChange();
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim() !== "") {
      const newTag = inputTag.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInputTag("");
        handleInputChange();
      } else {
        alert("이미 추가된 태그입니다.");
      }
    }
  };

  const handleTagDelete = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    handleInputChange();
  };

  const handleImageDelete = () => {
    setImageSrc("");
  };

  return (
    <>
      <div className="add-header flexrow margin-bottom10">
        <p>상품 등록하기</p>
        <button className={isAllInputFilled ? "filled" : ""}>등록</button>
      </div>
      <div className="flexcolumn margin-bottom10">
        <div>
          <p>상품 이미지</p>
          <div className="flexrow">
            <div className="add-img">
              <label className="input-img-btn" htmlFor="imageInput">
                <span className="input-img-text">+</span>
                <br />
                <span>이미지 등록</span>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <div className="input-img-btn">
                {imageSrc && (
                  <>
                    <img src={imageSrc} className="handleImage" alt="add img" />
                    <img
                      src={imageHovered ? ic_x_blue : ic_x_gray}
                      alt="delete img"
                      className="delete-btn-img"
                      onClick={handleImageDelete}
                      onMouseEnter={() => setImageHovered(true)}
                      onMouseLeave={() => setImageHovered(false)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-name flexcolumn margin-bottom10">
        <p>상품명</p>
        <input
          type="text"
          value={inputName}
          placeholder="상품명을 입력해주세요."
          onChange={handleNameChange}
        />
      </div>
      <div className="add-text flexcolumn margin-bottom10">
        <p>상품 소개</p>
        <textarea
          className="add-des"
          value={inputDes}
          placeholder="상품 소개를 입력해주세요."
          onChange={handleDesChange}
        ></textarea>
      </div>
      <div className="add-price flexcolumn margin-bottom10">
        <p>판매가격</p>
        <input
          value={inputPrice}
          placeholder="판매 가격을 입력해주세요."
          onChange={handlePriceChange}
        />
      </div>

      <div className="add-tag flexcolumn margin-bottom10">
        <p>태그</p>
        <input
          placeholder="태그를 입력해주세요."
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
        />
      </div>
      <div className="tags flexrow">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            <p>{tag}</p>
            <img
              src={tagHovered[index] ? ic_x_blue : ic_x_gray}
              alt="delete img"
              className="delete-btn-tag"
              onClick={() => handleTagDelete(index)}
              onMouseEnter={() => {
                let newTagHovered = [...tagHovered];
                newTagHovered[index] = true;
                setTagHovered(newTagHovered);
              }}
              onMouseLeave={() => {
                let newTagHovered = [...tagHovered];
                newTagHovered[index] = false;
                setTagHovered(newTagHovered);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
