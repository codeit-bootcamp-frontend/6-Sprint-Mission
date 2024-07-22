import React, { useState } from 'react';
import styled from 'styled-components';
import InputItem from './InputItem';
import { FlexContainer } from '../../styles/CommonStyles';
import DeleteButton from './DeleteButton';

const TagButtonsSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap; // 태그가 길어지면 다음 줄로 넘어가도록 함
`;

const Tag = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  color: ${({ theme }) => theme.colors.gray[800]};
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

type TagInputProps = {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

function TagInput({ tags, onAddTag, onRemoveTag }: TagInputProps) {
  const [input, setInput] = useState<string>('');

  // 엔터 키 누르면 tags 배열에 input 값을 추가
  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if (event.key === 'Enter' && inputString) {
      event.preventDefault(); // 엔터 키 눌렀을 때 form이 제출되지 않도록 꼭 추가해 주세요!
      onAddTag(inputString);
      setInput(''); // 태그 추가 후 input field 초기화
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

              <DeleteButton onClick={() => onRemoveTag(tag)} label={`${tag} 태그`} />
            </Tag>
          ))}
        </TagButtonsSection>
      )}
    </div>
  );
}

export default TagInput;
