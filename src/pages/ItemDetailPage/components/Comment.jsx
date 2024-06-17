import { useTimeStamp } from '../../../hooks/useTimeStamp'
import styles from '../styles/Comment.module.css'
import HorizontalLine from '../../../components/HorizontalLine'

function Comment({ id }) {
  const createdAt = id.createdAt
  const timeAgo = useTimeStamp(createdAt)

  return (
    <div className={styles.commentWrapper}>
      <p className={styles.content}>{id.content}</p>
      <div className={styles.userProfile}>
        <img
          className={styles.userProfileImage}
          src={id.writer.image}
          alt="프로필 사진"
        />
        <div className={styles.userNicknameAndTimeAgo}>
          <p className={styles.userNickname}>{id.writer.nickname}</p>
          <p className={styles.timeAgo}>{timeAgo}</p>
        </div>
      </div>
      <HorizontalLine />
    </div>
  )
}

export default Comment
