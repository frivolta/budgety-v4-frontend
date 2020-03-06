import React from 'react';

export interface IWidgetContainer {
  children: React.ReactElement;
}

export const WidgetContainer: React.FC = ({ children }) => {
  return (
    <div className="WidgetContainer">
      {children}
    </div>
  );
};
