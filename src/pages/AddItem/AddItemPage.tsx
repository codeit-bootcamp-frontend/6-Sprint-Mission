/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postProduct, postImage } from '../../api/api';
import FileInput from './FileInput';
import InputForm from './InputForm';
import Tag from './Tag';
import * as S from './Styles/AddItemPageStyles';

function AddItemPage() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name: string, value: string | File | null) => {
    const newValue = value === null ? '' : value;
    switch (name) {
      case 'name':
        setName(newValue as string);
        break;
      case 'description':
        setDescription(newValue as string);
        break;
      case 'price':
        setPrice(newValue as string);
        break;
      case 'tag':
        setTag(newValue as string);
        break;
      case 'image':
        setImage(newValue as File);
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' && description.trim() !== '' && price.trim() !== '' && tags.length > 0
    );
  };

  // Tags
  const AddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;

    if (e.key === 'Enter' && inputValue !== '' && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const mutateImage = useMutation({
    mutationFn: postImage,
  });

  const mutateProduct = useMutation({
    mutationFn: postProduct,
  });

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      let imageUrl = '';

      if (image) {
        const imageData = await mutateImage.mutateAsync(image);
        imageUrl = imageData.url;
      }

      const productData = {
        name,
        description,
        price: Number(price),
        images: imageUrl ? [imageUrl] : [],
        tags,
      };

      await mutateProduct.mutateAsync(productData);
      alert('상품이 성공적으로 등록되었습니다.');
      navigate('/items');
    } catch (error) {
      console.error('에러가 발생했습니다.', error);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderTitle>상품 등록하기</S.HeaderTitle>
        <S.StyledButton type="button" disabled={!isFormValid()} onClick={handleSubmit}>
          등록
        </S.StyledButton>
      </S.Header>
      <S.Main>
        <div>
          <S.Title>상품 이미지</S.Title>
          <FileInput name="image" value={image} onChange={handleChange} />
        </div>

        <InputForm
          name="name"
          label="상품명"
          placeholder="상품명을 입력해주세요."
          value={name}
          onChange={handleInputChange}
        />
        <InputForm
          name="description"
          label="상품 소개"
          placeholder="상품 소개를 입력해주세요."
          value={description}
          onChange={handleInputChange}
        />
        <InputForm
          name="price"
          label="판매 가격"
          placeholder="판매 가격을 입력해주세요."
          value={price}
          onChange={handleInputChange}
        />
        <InputForm
          name="tag"
          label="태그"
          placeholder="태그를 입력해주세요."
          value={tag}
          onChange={handleInputChange}
          onKeyUp={(e) => AddTags(e)}
        />
      </S.Main>
      <Tag tags={tags} setTags={setTags} />
    </S.Wrapper>
  );
}

export default AddItemPage;
