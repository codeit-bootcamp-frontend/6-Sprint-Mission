import { ChangeEvent, useState } from 'react';

import Button from '@/components/Button';

type CommentFormProp = {
  placeholder?: string;
  onSubmit: (inputValue: string) => void;
};

export default function CommentForm({
  placeholder = '',
  onSubmit,
}: CommentFormProp) {
  const [value, setValue] = useState<string>('');

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitButtonClick = () => {
    onSubmit(value);
    setValue('');
  };

  return (
    <>
      <textarea
        className="h-[104px] resize-none rounded-xl bg-gray-100 px-6 py-4 text-base font-normal text-gray-800 placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaChange}
      />
      <div className="flex justify-end">
        <Button
          style={{ shape: 'square', size: 'small' }}
          disabled={value === ''}
          onClick={handleSubmitButtonClick}
        >
          등록
        </Button>
      </div>
    </>
  );
}
