import { useState } from "react";
import DeleteIcon from "../../images/tagDeleteBtn.png";

function Tags({ name, value, onChange }) {
  const [addTags, setAddTags] = useState(Array.isArray(value) ? value : []);

  const handleAddTags = (e) => {
    //input의 value값을 가져옴
    const nextTag = e.target.value;

    //Enter키를 누르고 value가 있고 같은 태그가 없으면 추가
    if (e.key === "Enter" && nextTag !== "" && !addTags.includes(nextTag)) {
      setAddTags([...addTags, nextTag]);
      //해당 인풋의 value값을 초기화
      e.target.value = "";
      //해당 인풋에 포커스
      e.target.focus();
      //onChange에 name값과 addTags와 현재 인풋 값을 넘겨줌
      onChange(name, [...addTags, nextTag]);
    }
  };

  const removeTags = (tagIndex) => {
    // 해당 index에 해당하는 값을 제외
    const filter = addTags.filter((el, index) => index !== tagIndex);
    setAddTags(filter);
    onChange(name, filter);
  };

  return (
    <div className="InputTags">
      <input
        type="text"
        name={name}
        placeholder="태그를 입력해주세요"
        onKeyUp={(e) => handleAddTags(e)}
      />
      <ul>
        {addTags &&
          addTags?.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tagText">{tag}</span>
              <img
                src={DeleteIcon}
                alt="태그 삭제 이미지"
                className="tagDelete"
                onClick={() => removeTags(index)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Tags;
