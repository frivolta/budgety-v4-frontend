import React, { Component } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from './Card';
import { AltCard } from './AltCard';

describe('<Card/> <AltCard/>', () => {
  const className = 'testclass';

  it('renders without errors', () => {
    render(<Card>children</Card>);
    render(<AltCard>children</AltCard>);
  });

  it('renders Card with className', () => {
    const { getByTestId } = render(<Card className={className}>children</Card>);
    expect(getByTestId('Card')).toHaveClass(className);
  });

  it('renders AltCard with className', () => {
    const { getByTestId } = render(<AltCard className={className}>children</AltCard>);
    expect(getByTestId('AltCard')).toHaveClass(className);
  });
});
