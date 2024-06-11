import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import PlusIcon from '@/assets/images/icon/ic_plus.svg';

import styles from '@/styles/addboard/AddImage.module.css';

import AddImage from './Image';
import Image from 'next/image';

interface FileInputProps {
	name: string;
	value: File | null;
	onChange: (name: string, value: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ name, value, onChange }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [preview, setPreview] = useState<string | undefined>(undefined);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const nextValue = e.target.files ? e.target.files[0] : null;
		onChange(name, nextValue);
	};

	const handleClearClick = () => {
		const inputNode = inputRef.current;
		if (!inputNode) return;

		inputNode.value = '';
		onChange(name, null);
		setPreview(undefined);
	};

	useEffect(() => {
		if (!value) return;

		const nextPreview = URL.createObjectURL(value);
		setPreview(nextPreview);

		return () => {
			URL.revokeObjectURL(nextPreview);
		};
	}, [value]);

	return (
		<>
			<label className={styles.AddImageTitle} htmlFor='file_input'>
				이미지
			</label>
			<div className={styles.AddImageWrap}>
				<label className={styles.AddImageLabel} htmlFor='file_input'>
					<Image src={PlusIcon} alt='플러스' className='plus' />
					<span className={styles.ImagePlaceholder}>이미지 등록</span>
				</label>
				<input id='file_input' type='file' onChange={handleChange} ref={inputRef} style={{ display: 'none' }} />

				<AddImage value={value} preview={preview} onClearClick={handleClearClick} />
			</div>
		</>
	);
};

export default FileInput;
