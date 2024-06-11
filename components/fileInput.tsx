import { MouseEvent, ChangeEvent, useEffect, useRef, useState } from 'react';
import deleteBtn from '@/public/images/icons/ic_X.svg';
import icPlus from '@/public/images/icons/ic_plus.svg';
import Image from 'next/image';

type Props = {
  name: string;
  value: File | string | null | Blob;
  onChange: (name: string, value: File | null) => void;
};

export default function FileInput({ name, value, onChange }: Props) {
  const [preview, setPreview] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.[0];
    if (nextValue) {
      onChange(name, nextValue);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const blob = typeof value === 'string' ? new Blob([value], { type: 'text/plain' }) : value;

    const nextPreview = URL.createObjectURL(blob);
    setPreview(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  const onClickImageUpload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  return (
    <div className='flex flex-col gap-3'>
      <p className='font-bold text-[14px] leading-4'>이미지</p>
      <div className='relative flex gap-2'>
        <input
          type='file' //
          accept='image/png, image/jpeg'
          className='hidden'
          ref={inputRef}
          onChange={handleChange}
        />
        <button
          onClick={onClickImageUpload}
          className='w-[168px] h-[168px] bg-cool-gray100 rounded-xl flex flex-col items-center justify-center'>
          <Image src={icPlus} alt='더하기 아이콘' />
          <span className='text-cool-gray400'>이미지 등록</span>
        </button>
        {value && <img src={preview} alt='이미지 미리보기' className='w-[168px] h-[168px] rounded-xl' />}
        {value && (
          <button className='absolute right-2 top-2 md:left-[313px] lg:left-[313px]' onClick={handleClearClick}>
            <Image src={deleteBtn} width={24} alt='삭제버튼' />
          </button>
        )}
      </div>
    </div>
  );
}
