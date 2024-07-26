import React, { ReactNode } from 'react';
import style from './style.module.css';

interface FormWrapperProps {
  label: string;
  id: string;
  children: ReactNode;
}

const FormWrapper = ({ label, id, children }: FormWrapperProps) => {
  return (
    <fieldset className={style.wrapper}>
      <label htmlFor={id} className={style.title}>
        {label}
      </label>
      {children}
    </fieldset>
  );
};

export default FormWrapper;
