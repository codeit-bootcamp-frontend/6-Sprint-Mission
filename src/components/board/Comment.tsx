import { CommentType } from '@/api/boards.api';
import Image from 'next/image';
import styles from '@/styles/board/Comments.module.css';
import UserIcon from '@/assets/images/icon/ic_profile.svg';
import useDate from '@/hooks/useDate';

interface CommentProps {
	comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
	const lastUpdated = new Date(comment.updatedAt);
	const diffDate = new Date().getTime() - lastUpdated.getTime();

	const time = useDate(diffDate);

	return (
		<div className={styles.board_comment_list} key={comment.id}>
			<span className={styles.board_comment_list_msg}>{comment.content}</span>

			<div className={styles.board_comment_list_writer}>
				<div className={styles.board_comment_list_writer_img}>
					{comment.writer.image ? (
						<Image src={comment.writer.image} alt={'프로필 이미지'} fill />
					) : (
						<Image src={UserIcon} alt={'프로필 이미지'} fill />
					)}
				</div>

				<div className={styles.board_comment_list_writer_info}>
					<span className={styles.board_comment_list_writer_name}>{comment.writer.nickname}</span>
					<span className={styles.board_comment_list_writer_time}>{time}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
