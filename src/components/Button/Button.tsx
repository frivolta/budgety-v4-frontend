import React from 'react';
import Spinner from 'react-svg-spinner';

interface IButton {
  handleClick: (e: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
  text: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<IButton> = props => {
  return (
    <button
      className={props.disabled ? 'Button Button--disabled' : 'Button'}
      onClick={props.handleClick}
      disabled={props.disabled}
    >
      {props.icon && <img className="Button__icon" src={props.icon} alt="button icon" />}
      {!props.isLoading &&
        <span className="Button__label">
          {props.text}
        </span>}
      {props.isLoading &&
        <span className="Button__label">
          <Spinner color="white" thickness={3} speed="slow" size="24px" />
        </span>}
    </button>
  );
};
