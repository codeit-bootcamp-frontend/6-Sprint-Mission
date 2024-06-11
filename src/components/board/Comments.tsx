import { CommentType } from '@/api/boards.api';
import { useState } from 'react';
import Image from 'next/image';

import styles from '@/styles/board/Comments.module.css';

import notCommentImage from '@/assets/images/icon/ic_comment_empty.svg';
import BackIcon from '@/assets/images/icon/ic_back.svg';

import Comment from './Comment';
import Link from 'next/link';

interface CommentsProps {
	comments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
	const [isDisabled, setIsDisabled] = useState(true);

	const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (isDisabled === !e.target.value) return;
		setIsDisabled(!e.target.value);
	};
	return (
		<div className={styles.board_comment_wrap}>
			<div className={styles.board_comment_write}>
				<span className={styles.board_comment_write_title}>댓글 달기</span>
				<textarea
					className={styles.board_comment_write_msg}
					placeholder='댓글을 입력하세요'
					onChange={handleTextarea}
				/>
				<div className={styles.board_comment_write_btn_wrap}>
					<button className={styles.board_comment_write_btn} disabled={isDisabled}>
						등록
					</button>
				</div>
			</div>

			{comments.length ? (
				comments.map((comment) => <Comment key={comment.id} comment={comment} />)
			) : (
				<div className={styles.board_comment_empty_wrap}>
					<div className={styles.board_comment_empty_image}>
						<Image src={notCommentImage} alt='코멘트 없음' fill objectFit='contain' />
					</div>
					<span className={styles.board_comment_empty_msg}>
						아직 댓글이 없어요,
						<br />
						지금 댓글을 달아보세요!
					</span>
				</div>
			)}
			<div className={styles.board_back_wrap}>
				<Link href='/boards' className={styles.board_back_btn}>
					<div className={styles.board_back_content}>
						목록으로 돌아가기
						<div className={styles.board_back_img}>
							<Image src={BackIcon} alt='뒤로' width={26} height={26} />
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Comments;
