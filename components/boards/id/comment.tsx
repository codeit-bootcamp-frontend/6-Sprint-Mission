import styles from "@/styles/post.module.css";
import Image from "next/image";
import user_icon from "@/public/icon/user_icon.svg";
import TimeToBefore from "@/utils/timeToBefore";
import { CommentProps } from "@/types";
import MoreOptionsButton from "./commentMoreButton";
import CommentEdit from "./commentEdit";

export default function Comment({
  comment,
  onEdit,
  onDelete,
  isEdit,
  onCancelEdit,
  onSaveEdit,
}: CommentProps) {
  return (
    <div className={styles.commentContainer}>
      {isEdit ? (
        <CommentEdit
          comment={comment}
          onSave={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ) : (
        <>
          <div className={styles.commentContentContainer}>
            <span className={styles.commentContent}>{comment.content}</span>
            <MoreOptionsButton
              onEdit={() => onEdit(comment.id)}
              onDelete={() => onDelete(comment.id)}
            />
          </div>
          <div className={styles.commentInfo}>
            {comment.writer.image ? (
              <Image
                width={32}
                height={32}
                alt="profile"
                src={comment.writer.image}
                className={styles.userImg}
              />
            ) : (
              <Image width={32} height={32} alt="profile" src={user_icon} />
            )}
            <div className={styles.commentInfoRight}>
              <span className={styles.commentWriter}>
                {comment.writer.nickname}
              </span>
              <span className={styles.commentTimes}>
                {TimeToBefore(comment.createdAt)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
