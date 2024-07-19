'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { deleteArticle } from '@/app/apis/deleteArticle';
import { deleteComment } from '@/app/apis/deleteCommnet';
import kebabIcon from '@/app/assets/images/ic_kebab.png';
import useOutsideClick from '@/app/hooks/useOutsideClick';

import styles from './Dropdown.module.css';

interface DropdownMenuProps {
  articleId?: number;
  commentId?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  articleId,
  commentId,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useOutsideClick(dropdownRef, closeDropdown);

  const handleDelete = async () => {
    try {
      if (articleId) {
        await deleteArticle(articleId);
        alert('삭제가 완료되었습니다.');
        router.push('/boards');
      } else if (commentId) {
        await deleteComment(commentId);
        alert('댓글이 삭제되었습니다.');
        router.refresh();
      }
    } catch (error: any) {
      let errorMessage = '알 수 없는 오류가 발생했습니다.';

      if (error.response) {
        switch (error.response.status) {
          case 403:
            errorMessage = '본인 글/댓글만 삭제할 수 있습니다.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다.';
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      }

      console.error('Failed to delete:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button className={styles.kebabIcon} onClick={toggleDropdown}>
        <Image src={kebabIcon} alt="케밥아이콘" />
      </button>
      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem}>수정하기</div>
          <div className={styles.dropdownItem} onClick={handleDelete}>
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
