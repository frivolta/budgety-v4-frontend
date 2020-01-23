import React from 'react';
import { FieldError } from 'react-hook-form';
import { string } from 'yup';

interface IInput {
  small?: boolean;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  register?: any;
  hasErrors?: FieldError | undefined;
  errorMessage: string | undefined;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Input: React.FC<IInput> = props => {
  return (
    <div className={`Input ${props.small && `Input--small`}`}>
      <input
        name={props.name}
        ref={props.register}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        className={`Input__field ${props.small && `Input__field--small`} ${props.hasErrors &&
          `Input__field--hasErrors`}`}
        placeholder={props.placeholder}
        disabled={props.disabled ? props.disabled : false}
        data-testid="Input"
      />
      {props.hasErrors &&
        <span className="Input__field--hasErrors__message" data-testid="Input-error">
          {props.errorMessage}
        </span>}
    </div>
  );
};
