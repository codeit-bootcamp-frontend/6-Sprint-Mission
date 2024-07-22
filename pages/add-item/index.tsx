import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import styles from './add-item.module.css';
import FileInput from '@/components/fileInput';
import TagInput from '@/components/add-item/TagInput';
import { useMutation } from '@tanstack/react-query';
import { postProduct } from '@/lib/api/products';
import { postImageUrl } from '@/lib/api/image-url';
import { useRouter } from 'next/router';

export default function AddItem() {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const router = useRouter();
  const [values, setValues] = useState({
    imageFile: null,
    name: '',
    description: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState('');

  const addComma = (price: string) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return returnString;
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let str = value.replaceAll(',', '');
    setPrice(str);
  };

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

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  type newPost = {
    name: string;
    description: string;
    images: string[] | undefined;
    tags: string[];
    price: number;
    token: string | null;
  };

  const uploadPostMutation = useMutation({
    mutationFn: (newPost: newPost) => postProduct(newPost),
    onSuccess: data => {
      router.push(`/items/${data.id}`);
    },
    onError: error => {
      console.error('Error posting article:', error);
    },
  });

  const createImageURLMutation = useMutation({
    mutationFn: (formData: FormData) => postImageUrl(formData, token),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { imageFile, name, description } = values;
      let images: string[] = [];

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await createImageURLMutation.mutateAsync(formData);
        images.push(imageResponse.url);
      }

      const newPost = { token, images, name, description, tags, price: parseFloat(price) };
      uploadPostMutation.mutate(newPost);
    } catch (error) {
      console.error('Error posting article:', error);
    }
  };

  const isFormComplete =
    values.name.trim() !== '' &&
    values.description.trim() !== '' &&
    Number(price) > 0 &&
    values.imageFile !== null &&
    tags.length > 0;

  const buttonStyle = {
    backgroundColor: isFormComplete ? '#3692FF' : '#9CA3AF',
  };

  const preventDefault = (e: KeyboardEvent<HTMLFormElement>) => {
    e.key === 'Enter' && e.preventDefault();
  };

  return (
    <form className={styles.addItemForm} action='submit' onSubmit={handleSubmit} onKeyDown={preventDefault}>
      <div className={styles.registerItemTitleWrap}>
        <h2 className={styles.registerItemTitle}>상품 등록하기</h2>
        <button className={styles.registerItemBtn} style={buttonStyle} type='submit' disabled={!isFormComplete}>
          등록
        </button>
      </div>
      <FileInput name='imageFile' value={values.imageFile} onChange={handleFileChange} />
      <label htmlFor='name' className={styles.formLabel}>
        상품명
        <input
          id='name'
          name='name'
          value={values.name}
          type='text'
          placeholder='상품명을 입력해주세요'
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </label>

      <label htmlFor='description' className={styles.formLabel}>
        상품 소개
        <textarea
          id='description'
          name='description'
          value={values.description}
          placeholder='상품 소개를 입력해주세요'
          onChange={handleTextAreaChange}
          className={`${styles.formInput} ${styles.addItemFormDescriptionInput}`}
        />
      </label>

      <label htmlFor='price' className={styles.formLabel}>
        판매가격
        <input
          id='price'
          name='price'
          value={addComma(price) || ''}
          type='text'
          placeholder='판매 가격을 입력해주세요'
          onChange={handlePriceChange}
          className={styles.formInput}
        />
      </label>
      <TagInput name='tag' tagList={tags} setTagList={setTags} />
    </form>
  );
}
