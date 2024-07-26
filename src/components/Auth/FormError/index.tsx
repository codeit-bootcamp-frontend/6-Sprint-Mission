import React from 'react';
import style from './style.module.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <span className={style.message}>{message}</span>;
};

export default ErrorMessage;
