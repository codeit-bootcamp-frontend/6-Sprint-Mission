import { CommentProps } from "@/types/type";
import styles from "@/styles/Comment.module.css";
import Image from "next/image";
import userProfile from "@/public/user/userprofile.svg";

export default function Comment({ comment }: CommentProps) {
  return (
    <div>
      <ul>
        <li key={comment.id}>
          <div className={styles.commentsContainer}>
            <div className={styles.commentsText}>{comment.content}</div>
            <div className={styles.commentsProfile}>
              <Image
                src={userProfile}
                alt={comment.writer.nickname}
                width={40}
                height={40}
              />
              <div>
                <div className={styles.commentsName}>
                  {comment.writer.nickname}
                </div>
                <div className={styles.commentsAt}>{comment.updatedAt}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
