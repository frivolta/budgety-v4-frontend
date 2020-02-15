import React from 'react';
import Spinner from 'react-svg-spinner';

interface IButton {
  handleClick: (e: React.BaseSyntheticEvent<object, any, any>) => Promise<void> | void;
  text: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
  classNames?: string;
}

export const Button: React.FC<IButton> = props => {
  return (
    <button
      className={props.disabled ? 'Button Button--disabled' : 'Button'}
      onClick={props.handleClick}
      disabled={props.disabled}
      data-testid="Button"
    >
      {props.icon && <img className="Button__icon" src={props.icon} alt="button icon" />}
      {!props.isLoading &&
        <span className="Button__label">
          {props.text}
        </span>}
      {props.isLoading &&
        <span className="Button__label" data-testid="Spinner">
          <Spinner color="white" thickness={3} speed="slow" size="24px" />
        </span>}
    </button>
  );
};
