import { useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import SubmitButton from '@/components/submit-btn';
import FileInput from '@/components/fileInput';
import { postArticle } from '@/lib/api/articles';
import { useRouter } from 'next/router';
import { postImageUrl } from '@/lib/api/image-url';

type Values = {
  imgFile: File | null;
  title: string;
  content: string;
};

export default function AddArticleForm() {
  const router = useRouter();
  const [token, setToken] = useState('');
  useEffect(() => {
    const localToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const [values, setValues] = useState<Values>({
    imgFile: null,
    title: '',
    content: '',
  });

  const handleFileChange = (name: string, value: File | null) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChange = (name: string, value: string | null) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { title, content, imgFile } = values;
      let imageUrl;

      if (imgFile) {
        const formData = new FormData();
        formData.append('image', imgFile);

        const imageResponse = await postImageUrl(formData, token);
        imageUrl = imageResponse.url;
      }

      const response = await postArticle(title, content, token, imageUrl);

      if (response) {
        router.push('/boards');
      } else {
        console.error('Error posting article');
      }
    } catch (error) {
      console.error('Error posting article:', error);
    }
  };

  const isFormComplete = values.title.trim() !== '' && values.content.trim() !== '';

  const preventDefault = (e: KeyboardEvent<HTMLFormElement>) => {
    e.key === 'Enter' && e.preventDefault();
  };

  return (
    <form
      className='flex-col pt-6 m-auto w-mobile md:w-tablet lg:w-desktop h-[78vh]'
      action='submit'
      onSubmit={handleSubmit}
      onKeyDown={preventDefault}>
      <div className='flex items-center justify-between'>
        <h1>상품 등록하기</h1>
        <SubmitButton checkValue={isFormComplete}>{'등록'}</SubmitButton>
      </div>
      <label htmlFor='title' className='font-bold text-[14px] leading-4'>
        *제목
      </label>
      <input
        id='title'
        name='title'
        value={values.title}
        type='text'
        placeholder='상품명을 입력해주세요'
        onChange={e => handleChange('title', e.target.value)}
        className='mt-3 mb-6 w-mobile md:w-tablet lg:w-desktop h-14'
      />

      <label htmlFor='content' className='font-bold text-[14px] leading-4'>
        *내용
      </label>
      <textarea
        id='content'
        name='content'
        value={values.content}
        placeholder='내용을 입력해주세요'
        onChange={e => handleChange('content', e.target.value)}
        className='mt-3 mb-6 w-mobile md:w-tablet lg:w-desktop h-[200px]'
      />

      <FileInput
        name='imgFile' //
        value={values.imgFile}
        onChange={handleFileChange}
      />
    </form>
  );
}
