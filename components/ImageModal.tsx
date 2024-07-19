import Image from 'next/image';
import { useRef } from 'react';

import useOutsideClick from '@/app/hooks/useOutsideClick';

import styles from './ImageModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
};

export default function ImageModal({ isOpen, onClose, imageSrc }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalContent}>
          <Image
            src={imageSrc}
            alt="Article Image"
            objectFit="contain"
            width={700}
            height={700}
          />
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}
