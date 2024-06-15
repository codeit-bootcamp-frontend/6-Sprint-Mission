import ImageUpload from '@/components/ui/ImageUpload';
import Input from '@/components/ui/Input';
import { useState } from 'react';

const addArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="flex flex-col w-[1200px] m-auto">
      <div className="flex justify-between">
        <header>게시글 쓰기</header>
        <button>등록</button>
      </div>
      <div className="flex flex-col gap-6">
        <Input
          id="title"
          label="* 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          gap={12}
        />
        <Input
          id="description"
          label="* 내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="내용을 입력해주세요"
          gap={12}
        />

        <ImageUpload title="이미지" />
      </div>
    </div>
  );
};

export default addArticle;
