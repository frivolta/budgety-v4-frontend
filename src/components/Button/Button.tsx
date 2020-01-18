import React from 'react';

interface IButton {
  handleClick: (e: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
  text: string;
  icon?: string;
  disabled?: boolean;
}

export const Button: React.FC<IButton> = props => {
  return (
    <button className="Button" onClick={props.handleClick} disabled={props.disabled}>
      {props.icon && <img className="Button__icon" src={props.icon} alt="button icon" />}
      <span className="Button__label">
        {props.text}
      </span>
    </button>
  );
};
