import React, { ReactNode } from "react";

interface ILabel {
  children: ReactNode;
  classNames?: string;
}

export const Label: React.FC<ILabel> = props => {
  return <span className={`Label ${props.classNames}`}>{props.children}</span>;
};
