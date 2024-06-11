import { BoardType, CommentType } from '@/api/boards.api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import HeartIcon from '@/assets/images/icon/ic_heart.svg';
import UserIcon from '@/assets/images/icon/ic_profile.svg';

import styles from '@/styles/board/board.module.css';
import { text } from 'stream/consumers';

interface BoardProps {
	board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
	const createdAt = new Date(board.createdAt).toLocaleDateString();
	const likeCount = board.likeCount > 9999 ? '9999+' : board.likeCount;

	return (
		<div key={board.id} className={styles.board_main}>
			<span className={styles.board_title}>{board.title}</span>

			<div className={styles.board_writer}>
				<div className={styles.board_writer_img}>
					{board.writer.image ? (
						<Image src={board.writer.image} alt={'프로필 이미지'} fill />
					) : (
						<Image src={UserIcon} alt={'프로필 이미지'} fill />
					)}
				</div>

				<span className={styles.board_writer_name}>{board.writer.nickname}</span>
				<span className={styles.board_writer_time}>{createdAt}</span>

				<div className={styles.board_writer_like}>
					<div className={styles.board_writer_like_icon}>
						<Image src={HeartIcon} alt={'좋아요'} fill />
					</div>
					<span className={styles.board_writer_like_count}>{likeCount}</span>
				</div>
			</div>

			<div className={styles.board_content}>
				<span className={styles.board_content_msg}>{board.content}</span>

				{board.image && (
					<div className={styles.board_content_image}>
						<Image src={board.image} alt={'상품 이미지'} fill objectFit='contain' />
					</div>
				)}
			</div>
		</div>
	);
};

export default Board;
