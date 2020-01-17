import React from 'react';

interface IButton {
  handleClick: () => void;
  text: string;
  icon?: string;
}

export const Button: React.FC<IButton> = props => {
  return (
    <div className="Button" role="button" onClick={props.handleClick}>
      {props.icon && <img className="Button__icon" src={props.icon} alt="button icon" />}
      <span className="Button__label">
        {props.text}
      </span>
    </div>
  );
};
