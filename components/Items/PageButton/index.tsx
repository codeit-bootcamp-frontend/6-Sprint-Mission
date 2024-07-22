import React from 'react';
import styles from './page-button.module.css';

export default function PageButton() {
  return (
    <div className={styles.items__buttons}>
      <button>&lt;</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>&gt;</button>
    </div>
  );
}
