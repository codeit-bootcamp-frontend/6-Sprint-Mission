import AddImage from '@/components/addboard/AddImage';
import HeaderSpace from '@/components/common/HeaderSpace';
import Header from '@/components/navigation/Header';
import { ChangeEvent, FormEvent, use, useEffect, useState } from 'react';

import styles from '@/styles/addboard/index.module.css';

interface Values {
	title: string;
	contents: string;
	imgFile: File | null;
}

const addBoard = () => {
	const [values, setValues] = useState<Values>({
		title: '',
		contents: '',
		imgFile: null,
	});

	const [isValidForm, setIsValidForm] = useState<boolean>(true);

	const handleChange = (name: keyof Values, value: string | File | null | string[]) => {
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
		// console.log('handleChange: ', name, value);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		handleChange(name as keyof Values, value);
	};

	const handleFileChange = (name: string, value: File | null) => {
		handleChange(name as keyof Values, value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('등록: ', values);
	};

	useEffect(() => {
		if (!isValidForm && !(values.title && values.contents)) {
			setIsValidForm(true);
		} else if (isValidForm && !!(values.title && values.contents)) {
			setIsValidForm(false);
		}
	}, [values]);
	return (
		<>
			<Header />
			<HeaderSpace />
			<main className={styles.add_board_main}>
				<form className={styles.add_board_form} onSubmit={handleSubmit}>
					<div className={styles.add_board_submit}>
						<span className={styles.add_board_submit_title}>게시글 쓰기</span>
						<button className={styles.add_board_submit_btn} type='submit' disabled={isValidForm}>
							등록
						</button>
					</div>

					<div className={styles.add_board_title}>
						<label className={styles.add_board_title_text}>*제목</label>
						<input
							className={styles.add_board_title_input}
							type='text'
							name='title'
							placeholder='제목을 입력해주세요'
							onChange={handleInputChange}
						/>
					</div>

					<div className={styles.add_board_content}>
						<label className={styles.add_board_content_text}>*내용</label>
						<textarea
							className={styles.add_board_content_input}
							name='contents'
							placeholder='내용을 입력해주세요'
							onChange={handleInputChange}
						/>
					</div>

					<div className={styles.add_board_image}>
						<AddImage name='imgFile' value={values.imgFile} onChange={handleFileChange} />
					</div>
				</form>
			</main>
		</>
	);
};

export default addBoard;
