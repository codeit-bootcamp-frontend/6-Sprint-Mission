import { KeyboardEvent, useState } from 'react';
import Input from './Input';
import Button from './Button';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onAddTag, onRemoveTag }) => {
  const [input, setInput] = useState('');

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if ((e.key = 'Enter' && inputString)) {
      e.preventDefault();
      onAddTag(inputString);
      setInput('');
    }
  };

  return (
    <div>
      <Input
        id="tags"
        label="태그"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해주세요"
      />

      {tags.length > 0 && (
        <div>
          {tags.map((tag) => (
            <div key={`tag-${tag}`}>
              <span>{tag}</span>

              <Button onClick={() => onRemoveTag(tag)} label={`${tag} 태그`}>
                삭제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TagInput;
