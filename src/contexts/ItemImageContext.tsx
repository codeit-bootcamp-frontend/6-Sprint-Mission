import React, { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type ImageType = null | File;

interface ImageUrlProviderProps {
  defaultValue?: ImageType;
  children: ReactNode;
}

interface ImageUrlContextProps {
  imageUrl: ImageType;
  setImageUrl: (value: ImageType) => void;
}

const ImageUrlContext = createContext<ImageUrlContextProps | null>(null);

export const ImageUrlProvider = ({
  defaultValue = null,
  children,
}: ImageUrlProviderProps) => {
  const [imageUrl, setImageUrl] = useState<ImageType>(defaultValue);

  return (
    <ImageUrlContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ImageUrlContext.Provider>
  );
};

// imgUrl 값 가져오기
export const useImageUrl = () => {
  const context = useContext(ImageUrlContext);

  if (!context) {
    throw new Error('반드시 ImgUrlProvider 안에서 사용1');
  }

  return context.imageUrl;
};

// setImageUrl 값 가져오기
export const useSetImageUrl = () => {
  const context = useContext(ImageUrlContext);

  if (!context) {
    throw new Error('반드시 ImgUrlProvider 안에서 사용2');
  }

  return context.setImageUrl;
};
