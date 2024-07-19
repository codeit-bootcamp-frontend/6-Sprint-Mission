import Image from 'next/image';
import Link from 'next/link';

import { getArticleDetail, RootObject } from '@/app/apis/getArticleDetail';
import { getComments } from '@/app/apis/getComments';
import backIcon from '@/app/assets/images/ic_back.png';
import styles from '@/app/boards/[id]/Page.module.css';
import BoardDetail from '@/components/BoardDetail/BoardDetail';
import CommentInput from '@/components/BoardDetail/CommentInput';
import CommentsList from '@/components/BoardDetail/CommentsList';

interface BoardDetailProps {
  params: {
    id: string;
  };
}

export default async function BoardDetailPage({ params }: BoardDetailProps) {
  const articleId = parseInt(params.id, 10);
  const { list: comments } = await getComments(articleId, 5);
  const article: RootObject = await getArticleDetail(articleId);

  return (
    <div>
      <div className={styles.boardDetail}>
        <BoardDetail article={article} />
        <label className={styles.commentLabel}>댓글달기</label>
        <CommentInput articleId={articleId} />
        <CommentsList articleId={articleId} comments={comments} />
        <div className={styles.commentButtonContainer}>
          <Link href="/boards">
            <button className={styles.backButton}>
              <div className={styles.buttonText}>목록으로 돌아가기</div>
              <Image width={24} height={24} src={backIcon} alt="돌아가기" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
