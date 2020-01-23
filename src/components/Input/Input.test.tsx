import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Input } from './Input';

describe('<Input/>', () => {
  const placeholder = 'placeholder';
  const newValue = 'new value';
  const type = {
    email: 'email',
    password: 'password'
  };
  const name = 'name';
  const errormessage = 'error message';
  const mockedError = {
    type: 'error'
  };
  const handleChange = jest.fn();

  it('renders without errors with empty string value, defined type, placeholder', () => {
    const { getByTestId } = render(
      <Input type={type.email} name={name} placeholder={placeholder} errorMessage={errormessage} />
    );
    expect(getByTestId('Input')).toHaveValue('');
  });

  it('shows error label and has an error class if error is defined', () => {
    const { getByTestId } = render(
      <Input
        type={type.email}
        hasErrors={mockedError}
        name={name}
        placeholder={placeholder}
        errorMessage={errormessage}
      />
    );
    expect(getByTestId('Input')).toHaveClass('Input__field--hasErrors');
    expect(getByTestId('Input-error')).toBeInTheDocument();
  });

  it('is disabled if isDisabled prop', () => {
    const { getByTestId } = render(
      <Input type={type.email} disabled name={name} placeholder={placeholder} errorMessage={errormessage} />
    );
    expect(getByTestId('Input')).toBeDisabled();
  });

  it('to trigger change and to have new value', async () => {
    const { getByTestId } = render(
      <Input
        type={type.email}
        disabled
        name={name}
        placeholder={placeholder}
        errorMessage={errormessage}
        handleChange={handleChange}
      />
    );
    const input = getByTestId('Input');
    fireEvent.change(input, { target: { value: newValue } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue(newValue);
  });
});
