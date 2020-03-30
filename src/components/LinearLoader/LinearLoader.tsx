import React from "react";

export type LinearLoaderProps = {
  isActive: boolean;
};
export const LinearLoader: React.FC<LinearLoaderProps> = props => {
  return (
    <div className="LinearLoader__container" data-testid="LinearLoader">
      {props.isActive && <div className="LinearLoader__continues" data-testid="LinearLoaderContinues" />}
    </div>
  );
};
