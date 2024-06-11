import useDate from '@/hooks/useDate';
import styles from '@/styles/Items/Comments.module.css';
import { set } from 'lodash';
import Image from 'next/image';

import { useEffect, useState } from 'react';

interface CommentProps {
	comment: {
		content: string;
		updatedAt: string;
		writer: {
			image: string;
			nickname: string;
		};
	};
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
	const lastUpdated = new Date(comment.updatedAt);
	const diffDate = new Date().getTime() - lastUpdated.getTime();

	const time = useDate(diffDate);

	return (
		<div className={styles.comment_wrap}>
			<span className={styles.comment}>{comment.content}</span>

			<div className={styles.comment_writer}>
				<div className={styles.comment_writer_img}>
					<Image src={comment.writer.image} alt='아바타' fill />
				</div>

				<div className={styles.comment_writer_main}>
					<span className={styles.comment_writer_nickname}>{comment.writer.nickname}</span>
					<span className={styles.comment_updated_time}>{time}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
