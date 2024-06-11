import ic_profile from '@/assets/images/icon/ic_profile.svg';
import ic_heart from '@/assets/images/icon/ic_heart.svg';

import styles from '@/styles/boards/AllArticles.module.css';

import useDeviceSize from '@/hooks/useDeviceSize';
import { BoardType } from '@/api/boards.api';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface AllSectionProps {
	board: BoardType;
}

const AllSection: React.FC<AllSectionProps> = ({ board }) => {
	const deviceSize = useDeviceSize();

	/**
	 * 게시글 내용을 장치 사이즈에 맞게 잘라서 반환하는 함수
	 * @returns {string} - 잘라진 게시글 내용
	 */
	const content = () => {
		if (deviceSize === 'mobile') {
			return board.content.length > 50 ? board.content.slice(0, 50) + '...' : board.content;
		} else if (deviceSize === 'tablet') {
			return board.content.length > 120 ? board.content.slice(0, 120) + '...' : board.content;
		} else {
			return board.content.length > 200 ? board.content.slice(0, 200) + '...' : board.content;
		}
	};

	const createdAt = new Date(board.createdAt).toLocaleDateString();
	const likeCount = board.likeCount > 9999 ? '9999+' : board.likeCount;

	return (
		<Link href={`/boards/${board.id}`}>
			<div className={styles.all_section_wrap}>
				<div className={styles.all_section_main}>
					<span className={styles.all_section_content}>{content()}</span>

					{board.image && (
						<div className={styles.all_section_border}>
							<div className={styles.all_section_image}>
								<Image src={board.image} alt={board.writer.nickname} fill style={{ objectFit: 'cover' }} />
							</div>
						</div>
					)}
				</div>

				<div className={styles.all_section_user}>
					<div className={styles.all_section_user_data}>
						<div className={styles.all_section_user_img}>
							<Image src={ic_profile} alt='유저 아이콘' fill />
						</div>
						<span className={styles.all_section_nickname}>{board.writer.nickname}</span>

						<span className={styles.all_section_createdAt}>{createdAt}</span>
					</div>

					<div className={styles.all_section_like_wrap}>
						<div className={styles.all_section_like_ic}>
							<Image src={ic_heart} alt='좋아요 아이콘' fill />
						</div>
						<span className={styles.all_section_like}>{likeCount}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default AllSection;
