import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from './Button';

describe('<Button/>', () => {
  const mockedClick = jest.fn();
  const text = 'Button text';

  it('renders without errors', () => {
    render(<Button handleClick={e => mockedClick(e)} text={text} />);
  });

  it('shows spinner if it is loading', () => {
    const { getByTestId } = render(<Button handleClick={e => mockedClick(e)} text={text} isLoading />);
    expect(getByTestId('Spinner')).toBeInTheDocument();
  });

  it('is disabled if has disabled prop and cannot click', () => {
    const { getByTestId } = render(<Button handleClick={e => mockedClick(e)} text={text} disabled />);
    expect(getByTestId('Button')).toBeDisabled();
    fireEvent.click(getByTestId('Button'));
    expect(mockedClick).toHaveBeenCalledTimes(0);
  });

  it('calls an action on click', () => {
    const { getByTestId } = render(<Button handleClick={e => mockedClick(e)} text={text} />);
    fireEvent.click(getByTestId('Button'));
    expect(mockedClick).toHaveBeenCalledTimes(1);
  });
});
