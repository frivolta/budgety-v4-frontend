import React, { useEffect } from "react";
import { Label } from "../Label/Label";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useSidenavValue } from "../../context/useSidenavValue";

export interface IHeader {}

const ME_QUERY = gql`
  query {
    me {
      email
    }
  }
`;

export const Header: React.FC = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();
  const { data, loading, error } = useQuery(ME_QUERY, {
    pollInterval: 500
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="Header">
      <div className="Header__left">
        <div
          className="Icon Icon__menu"
          role="button"
          onClick={() => setSidenavIsOpen(!sidenavIsOpen)}
        >
          <img src="/images/burger-menu.svg" alt="burger menu" />
        </div>
        <div className="Icon Icon__darkmode">
          <img src="/images/darkmode.svg" alt="darkmode" />
        </div>
      </div>
      <div className="Header__right">
        <Label classNames="mr-1 strong">{data && data.me.email}</Label>
        <div
          className="Icon Icon__logout"
          role="button"
          onClick={() => console.log("is open")}
        >
          <img src="/images/logout.svg" alt="burger menu" />
        </div>
      </div>
    </div>
  );
};
