import closeIcon from '@/assets/images/icon/ic_X.svg';
import React from 'react';

import styled from '@/styles/addboard/Image.module.css';
import Image from 'next/image';

interface AddItemImageProps {
	value: File | null;
	preview: string | undefined;
	onClearClick?: () => void;
}

const AddImage: React.FC<AddItemImageProps> = ({ value, preview, onClearClick }) => {
	if (!value) return null;

	return (
		<div className={styled.PreviewImageWrap}>
			<img className={styled.PreviewImage} src={preview} alt='이미지 미리보기' />
			<button className={styled.CloseIcon} onClick={onClearClick}>
				<Image src={closeIcon} alt='닫기 아이콘' />
			</button>
		</div>
	);
};

export default AddImage;
