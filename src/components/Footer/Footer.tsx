import React from 'react';
import { Label } from '../Label/Label';

export const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <Label classNames="Label__small">
        Budgety v4 • Made with <span className="alt-color">&#10084;</span> © 2019
      </Label>
    </footer>
  );
};
