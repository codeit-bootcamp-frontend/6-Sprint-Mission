import React, { useState } from "react";
import PlusIcon from "../../assets/img/PlusIcon.png";
import "./FileInput.css";

function FileInput({ title }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imgUrl);
    }
  };

  return (
    <div >
        {title && <div className="Label">{title}</div>}
        <div className="ImageUploadContainer">
        <div className="ImgContainer" onClick={handleDivClick}>
          <img src={PlusIcon} />
          이미지 등록
        </div>
        <input
          className="ImgUpload"
          id="imageUpload"
          type="file"
          onChange={handleImgUpload}
        />
        <img className="imagePreviewUrl" src={imagePreviewUrl} />    
      </div>
    </div>
  );
}

export default FileInput;
