import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Label } from './Label';

describe('<Label/>', () => {
  const Component = () => {
    return <p>Component</p>;
  };
  it('renders without errors with children', () => {
    render(
      <Label>
        <Component />
      </Label>
    );
  });
});
