import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "../assets/images/ic_X.png";

const InputTag = ({ tags, setTags, setIsTagsEmpty }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      e.preventDefault();
      setInputValue("");
      setIsTagsEmpty(false);
    }
  };

  const handleTagDelete = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setIsTagsEmpty(newTags.length === 0);
  };

  return (
    <InputTagContainer>
      <TagInput
        type="tag"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="태그를 입력하세요"
      />
      <TagList>
        {tags.map((tag) => (
          <TagItem key={`tag-${tag}`}>
            <TagText>{tag}</TagText>
            <DeleteButton onClick={() => handleTagDelete(`tag-${tag}`)}>
              <CloseIcon src={DeleteIcon} alt="삭제 아이콘" />
            </DeleteButton>
          </TagItem>
        ))}
      </TagList>
    </InputTagContainer>
  );
};

const InputTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TagInput = styled.input`
  width: 100%;
  height: 56px;
  gap: 12px;
  margin-top: 20px;
  background: #f3f4f6;
  border-radius: 12px;
  border: 0.5px solid #ccc;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  &:focus {
    border: 1px solid #3692ff;
    outline: none;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  color: #333;
  padding: 5px 10px;
  border-radius: 30px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TagText = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ccc;
  border: none;
  cursor: pointer;
  margin-left: 5px;
`;

const CloseIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;
export default InputTag;
