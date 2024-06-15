import { ChangeEvent, useState } from 'react';
import PlusIcon from '@/public/images/icons/ic_plus.svg';
import Image from 'next/image';
import DeleteButton from './DeleteButton';

interface ImageUpload {
  title: string;
}

const ImageUpload: React.FC<ImageUpload> = ({ title }) => {
  const [imgPreviewUrl, setImgPreviewUrl] = useState('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgPreviewUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    setImgPreviewUrl('');
  };

  return (
    <div>
      {title && <label>{title}</label>}
      <div>
        <label htmlFor="image-upload">
          <PlusIcon />
          이미지 등록
        </label>
        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {imgPreviewUrl && (
          <>
            <Image
              width={40}
              height={40}
              src={imgPreviewUrl}
              alt="사진 미리보기"
            />

            <div>
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
