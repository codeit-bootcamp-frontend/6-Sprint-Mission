'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BASE_URL } from '@/app/apis/getArticle';
import FileInput from '@/components/BoardPost/FileInput';

import styles from './Page.module.css';

type Values = {
  title: string;
  content: string;
  imgFile: File | null;
};

export default function PostPage() {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    title: '',
    content: '',
    imgFile: null,
  });

  const handleChange = (name: keyof Values, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found');
        return;
      }

      const { title, content, imgFile } = values;

      let imageUrl;

      if (imgFile) {
        const formData = new FormData();

        formData.append('image', imgFile);

        const imageResponse = await fetch(`${BASE_URL}/images/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();

          imageUrl = imageData.url;
        } else {
          console.error('Error uploading image:', imageResponse.statusText);
          return;
        }
      }

      const requestBody = {
        title,
        content,
        image: imageUrl,
      };

      const response = await fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        router.push('/articles');
      } else {
        console.error('Error posting article:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting article:', error);
    }
  };

  const isButtonDisabled = !values.title || !values.content;

  return (
    <div>
      <div className={styles.postContainer}>
        <div className={styles.postWrapper}>
          <label className={styles.postTitle}>게시글 쓰기</label>
          <button
            className={styles.postButton}
            disabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
        <div className={styles.postTitleWrapper}>
          <label className={styles.postLabel}>*제목</label>
          <input
            className={styles.postTitleInput}
            placeholder="제목을 입력해주세요"
            value={values.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className={styles.postContentWrapper}>
          <div className={styles.postLabel}>*내용</div>
          <textarea
            className={styles.postContentInput}
            placeholder="내용을 입력해주세요"
            value={values.content}
            onChange={(e) => handleChange('content', e.target.value)}
          />
        </div>
        <div>
          <label className={styles.postLabel}>이미지</label>
          <FileInput
            name="imgFile"
            value={values.imgFile}
            onChange={(name, value) =>
              handleChange(name as keyof Values, value)
            }
          />
        </div>
      </div>
    </div>
  );
}
