import React, { ReactNode, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Sidenav } from "../../components/Sidenav/Sidenav";
import { Footer } from "../../components/Footer/Footer";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query me {
    email
  }
`;

export interface IDashBoardContainer {
  children: ReactNode;
}

export const DashboardContainer: React.FC<IDashBoardContainer> = ({
  children
}) => {
  const { data, error, loading } = useQuery(ME_QUERY);

  useEffect(() => {
    if (data) {
      localStorage.setItem("user_email", data);
    }
    if (error) {
      console.log(error);
    }
  }, [data]);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className="GridContainer">
      <Header />
      <Sidenav />
      <main className="Main">{children}</main>
      <Footer />
    </div>
  );
};
