import React from "react";

export const MenuItem: React.FC = () => {
  const handleProjectClick = () => {
    console.log("click");
  };

  return (
    <li className={"Menu__item Menu__item--active"}>
      <span className="Menu__item__link" onClick={handleProjectClick}>
        <a href="/">item</a>
      </span>
    </li>
  );
};
