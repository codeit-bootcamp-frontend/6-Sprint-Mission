'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import styles from './FileInput.module.css';

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ name, value, onChange }) => {
  const [previewImg, setPreviewImg] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onChange(name, selectedFile);
  };

  const handleRemoveFile = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = '';
    onChange(name, null);
    setPreviewImg('');
  };

  useEffect(() => {
    if (!value) {
      setPreviewImg('');
      return;
    }
    const nextPreview = URL.createObjectURL(value);
    setPreviewImg(nextPreview);
    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className={styles.fileInputContainer}>
      <div className={styles.totalContainer}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          id="file-input"
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input">
          <div className={styles.uploadButton}>
            <div className={styles.icon}>+</div>
            <div className={styles.text}>이미지 등록</div>
          </div>
        </label>
      </div>
      {value && (
        <div className={styles.imagePreview}>
          <Image
            fill
            className={styles.previewImage}
            src={previewImg}
            alt="Preview"
          />
          <button className={styles.removeButton} onClick={handleRemoveFile}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
