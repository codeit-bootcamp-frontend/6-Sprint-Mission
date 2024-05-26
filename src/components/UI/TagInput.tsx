import React, { useState } from "react";
import styled from "styled-components";
import InputItem from "./InputItem";
import { FlexContainer } from "../../styles/CommonStyles";
import DeleteButton from "./DeleteButton";

const TagButtonsSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap; // 태그가 길어지면 다음 줄로 넘어가도록 함
`;

const Tag = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.colors.gray[2]};
  color: ${({ theme }) => theme.colors.black};
  padding: 14px 14px 14px 16px;
  border-radius: 999px;
  min-width: 100px;
`;

const TagText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
  max-width: calc(100% - 28px); // DeleteButton 너비 및 margin을 제외한 공간
  /* 태그의 텍스트가 너무 길어 한 줄 내에 표시하기 어려운 경우 말줄임 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function TagInput({ tags, onAddTag, onRemoveTag }) {
  const [input, setInput] = useState("");

  // 엔터 키 누르면 tags 배열에 input 값을 추가
  const onPressEnter = (event) => {
    // 여러 자모를 결합해 하나의 글자를 만드는 아시아 언어권에서는 IME(입력 메소드 에디터)를 통해 브라우저에 글자를 입력해요.
    // 사용자가 글자를 완전히 조합하기 전에는 isComposing의 값이 true로 설정됩니다.
    // 한글 입력 시에 마지막 글자가 하이라이트되는 현상을 보신 적 있을 거예요. 이게 바로 isComposing이 true인 상태로, 아직 입력이 확정되지 않았음을 시각적으로 나타내는 거예요.
    // 만약 마지막 음절이 태그 배열에 중복으로 추가되는 현상이 있었다면 바로 이 이슈 때문이었을 거예요.
    // 이 코드를 추가하면 사용자가 아직 입력을 완료하지 않았을 때 함수의 나머지 부분이 실행되지 않도록 하여, 완성되지 않은 입력이 태그로 잘못 추가되는 것을 방지할 수 있어요.
    if (event.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if (event.key === "Enter" && inputString) {
      event.preventDefault(); // 엔터 키 눌렀을 때 form이 제출되지 않도록 꼭 추가해 주세요!
      onAddTag(inputString);
      setInput(""); // 태그 추가 후 input field 초기화
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
        placeholder="태그를 입력해 주세요"
      />

      {/* tags 배열이 비어있으면 TagButtonsSection을 렌더링하지 않음 */}
      {tags.length > 0 && (
        <TagButtonsSection>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`}>
              <TagText>{tag}</TagText>

              <DeleteButton
                onClick={() => onRemoveTag(tag)}
                label={`${tag} 태그`}
              />
            </Tag>
          ))}
        </TagButtonsSection>
      )}
    </div>
  );
}

export default TagInput;
