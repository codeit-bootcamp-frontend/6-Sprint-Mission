import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PlusImg from '../../../assets/images/icons/ic_plus.svg';
import CloseBtn from '../../../assets/images/icons/close_btn.png'

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

function FileInput({ name, value, onChange }: FileInputProps) {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  }
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if(!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  }

  useEffect(() => {
    if(!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(undefined);
      URL.revokeObjectURL(nextPreview);
    }
  },[value])

  return (
    <Container>
      <h3>상품 이미지</h3>
      <ImgArea>
        <ProductImg htmlFor="file">
          <img src={PlusImg} alt={PlusImg} />
          <div>이미지 등록</div>
        </ProductImg>
        <ImgBtn id='file' type="file" onChange={handleChange} ref={inputRef}/>
        {preview && (
          <PreviewImg>
            <PreviewImage src={preview} alt={preview} />
            {value && 
              <ImgCloseBtn onClick={handleClearClick}>
                <img src={CloseBtn} alt="" />
              </ImgCloseBtn>}
          </PreviewImg>)}
      </ImgArea>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`
const ImgArea = styled.div`
  display: flex;
  gap: 24px;
`
const ProductImg = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  color: #9ca3af;
  width: 282px;
  height: 282px;
  border-radius: 12px;
  background-color: #f3f4f6;
`
const ImgBtn =  styled.input`
  display: none;
`;
const PreviewImg = styled.div`
  position: relative;
  width: 282px;
  height: 282px;
  border-radius: 12px;
`
const ImgCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #ffffff;
  background-color: #3692ff;
`;

const PreviewImage = styled.img`
  width: 282px;
  height: 282px;
  border-radius: 12px;
`

export default FileInput;