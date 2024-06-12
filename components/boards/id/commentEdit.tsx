import React, { useState } from "react";
import styles from "@/styles/post.module.css";
import { CommentType } from "@/types";

interface CommentEditProps {
  comment: CommentType;
  onSave: (id: number, newContent: string) => void;
  onCancelEdit: () => void;
}

const CommentEdit: React.FC<CommentEditProps> = ({
  comment,
  onSave,
  onCancelEdit,
}) => {
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSave = () => {
    onSave(comment.id, editedContent);
  };

  return (
    <div className={styles.commentEditContainer}>
      <textarea
        className={styles.viewAddContent}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div className={styles.commentEditActions}>
        <button
          onClick={handleSave}
          className={`${styles.viewAddBtn} ${
            editedContent.trim() !== comment.content.trim() && styles.active
          }`}
        >
          저장
        </button>
        <button onClick={onCancelEdit} className={styles.viewAddBtn}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CommentEdit;
