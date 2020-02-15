import React from 'react';
import Spinner from 'react-svg-spinner';

interface IButton {
  handleClick: (e: React.BaseSyntheticEvent<object, any, any>) => Promise<void> | void;
  text: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const AltButton: React.FC<IButton> = props => {
  return (
    <button
      className={props.disabled ? 'AltButton AltButton--disabled' : 'AltButton'}
      onClick={props.handleClick}
      disabled={props.disabled}
      data-testid="AltButton"
    >
      {props.icon && <img className="AltButton__icon" src={props.icon} alt="button icon" />}
      {!props.isLoading &&
        <span className="AltButton__label">
          {props.text}
        </span>}
      {props.isLoading &&
        <span className="AltButton__label" data-testid="Spinner">
          <Spinner color="white" thickness={3} speed="slow" size="24px" />
        </span>}
    </button>
  );
};
