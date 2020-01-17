import React from 'react';

interface IInput {
  small?: boolean;
  placeholder: string;
  type: string;
  value: string;
  hasErrors?: boolean;
  errorMessage: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Input: React.FC<IInput> = props => {
  return (
    <div className={`Input ${props.small && `Input--small`}`}>
      <input
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        className={`Input__field ${props.small && `Input__field--small`} ${props.hasErrors &&
          `Input__field--hasErrors`}`}
        placeholder={props.placeholder}
        onKeyPress={props.handleKeyPress}
        disabled={props.disabled ? props.disabled : false}
      />
      {props.hasErrors &&
        <span className="Input__field--hasErrors__message">
          {props.errorMessage}
        </span>}
    </div>
  );
};
