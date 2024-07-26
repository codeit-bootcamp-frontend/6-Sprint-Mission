import React, { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './style.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  rounded?: boolean;
}

const NewButton = ({ children, rounded, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, {
        [styles.round]: rounded,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default NewButton;
