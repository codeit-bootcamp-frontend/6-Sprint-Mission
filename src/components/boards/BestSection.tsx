import ic_best from '@/assets/images/icon/ic_best.svg';
import ic_heart from '@/assets/images/icon/ic_heart.svg';

import styles from '@/styles/boards/BestArticles.module.css';
import { BoardType } from '@/api/boards.api';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface BestSectionProps {
	board: BoardType;
}

const BestSection: React.FC<BestSectionProps> = ({ board }) => {
	const createdAt = new Date(board.createdAt).toLocaleDateString();

	const content = board.content.length > 40 ? board.content.slice(0, 40) + '...' : board.content;

	return (
		<Link href={`/boards/${board.id}`}>
			<div className={styles.best_section_wrap}>
				<div className={styles.best_icon_wrap}>
					<div className={styles.best_icon_image}>
						<Image src={ic_best} alt='베스트 아이콘' fill />
					</div>

					<span className={styles.best_icon_title}>Best</span>
				</div>

				<div className={styles.best_section_main}>
					<span className={styles.best_section_content}>{content}</span>

					{board.image && (
						<div className={styles.best_section_border}>
							<div className={styles.best_section_image}>
								<Image src={board.image} alt={board.writer.nickname} fill style={{ objectFit: 'cover' }} />
							</div>
						</div>
					)}
				</div>

				<div className={styles.best_section_user}>
					<div className={styles.best_section_user_data}>
						<span className={styles.best_section_nickname}>{board.writer.nickname}</span>

						<div className={styles.best_section_like_wrap}>
							<div className={styles.best_section_like_ic}>
								<Image src={ic_heart} alt='좋아요 아이콘' fill />
							</div>
							<span className={styles.best_section_like}>{board.likeCount}</span>
						</div>
					</div>

					<span className={styles.best_section_createdAt}>{createdAt}</span>
				</div>
			</div>
		</Link>
	);
};

export default BestSection;
