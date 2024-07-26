import React, { ComponentProps, forwardRef } from 'react';
import FormWrapper from '../FromWrapper';
import classNames from 'classnames';
import style from './style.module.css';

interface FormInputProps extends ComponentProps<'input'> {
  label: string;
  id: string;
  placeholder: string;
  error?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, placeholder, error, ...props }, ref) => {
    return (
      <FormWrapper id={id} label={label}>
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          className={classNames(style.input, {
            [style.error]: error,
          })}
          ref={ref}
          {...props}
        />
      </FormWrapper>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
