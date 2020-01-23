import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Heading, variation } from './Heading';

describe('<Heading/>', () => {
  const childrenText = 'Children text';
  it('renders without errors all the heading tags', () => {
    Object.keys(variation).map(key =>
      render(
        <Heading variation={variation[key]}>
          {childrenText}
        </Heading>
      )
    );
  });
});
