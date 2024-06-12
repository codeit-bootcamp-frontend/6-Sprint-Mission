import { useState, useRef, useEffect } from "react";
import styles from "@/styles/commentMoreButton.module.css";

interface MoreOptionsButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const MoreOptionsButton: React.FC<MoreOptionsButtonProps> = ({
  onEdit,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.moreOptionsButton} ref={optionsRef}>
      <button onClick={toggleOptions} className={styles.moreOptionsIcon}>
        &#x22EE;
      </button>
      {showOptions && (
        <div className={styles.options}>
          <button onClick={onEdit}>수정하기</button>
          <button onClick={onDelete}>삭제하기</button>
        </div>
      )}
    </div>
  );
};

export default MoreOptionsButton;
