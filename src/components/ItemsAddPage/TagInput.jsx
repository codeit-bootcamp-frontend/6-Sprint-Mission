import React, { useState } from "react";
import InputItem from "./InputItem";
import Xicon from "../../assets/img/Xicon.svg";
import "./TagInput.css";

function TagInput({ tags, addTag }) {
  const [input, setInput] = useState("");

  const onPressEnter = (event) => {
    if (event.nativeEvent.isComposing) return;
    const inputStr = input.trim();
    if (event.key === "Enter" && inputStr) {
      event.preventDefault();
      addTag(inputStr);
      setInput("");
    }
  };

  return (
    <div>
      <InputItem
        id="tags"
        label="태그"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해주세요"
      />
      {tags.length > 0 && (
        <div className="tagsSection">
          {tags.map((tag) => (
            <div className="tagsLayOut" key={`tag-${tag}`}>
              <span className="TagContents">{tag}</span>
              <img src={Xicon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagInput;
