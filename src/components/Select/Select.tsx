import React, { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

export type SelectOptionType = {
  id: number;
  value: string;
  caption: string;
};

interface ISelect {
  small?: boolean;
  placeholder: string;
  name: string;
  options: SelectOptionType[];
  value?: string;
  register?: any;
  hasErrors?: FieldError | boolean | undefined;
  errorMessage?: string | undefined;
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export const Select: React.FC<ISelect> = props => {
  return (
    <div className={`Select ${props.small && `Select--small`}`}>
      <select
        name={props.name}
        ref={props.register}
        value={props.value}
        onChange={props.handleChange}
        className={`Select__field ${props.small && `Select__field--small`} ${props.hasErrors &&
          `Select__field--hasErrors`}`}
        disabled={props.disabled ? props.disabled : false}
        data-testid="Select"
      >
        {props.options.map(option =>
          <option className="Select__option" value={option.value} key={option.id}>
            {option.caption}
          </option>
        )}
      </select>
      {props.hasErrors &&
        <span className="Select__field--hasErrors__message" data-testid="Select-error">
          {props.errorMessage}
        </span>}
    </div>
  );
};
