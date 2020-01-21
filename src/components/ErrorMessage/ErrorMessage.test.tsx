import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ErrorMessage } from './ErrorMessage';

describe('<ErrorMessage/>', () => {
  const Component = () => {
    return <p>Component</p>;
  };
  it('renders without errors', () => {
    render(
      <ErrorMessage>
        <Component />
      </ErrorMessage>
    );
  });
});
