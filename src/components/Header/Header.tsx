import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Label } from '../Label/Label';

import { useSidenavValue } from '../../context/useSidenavValue';
import { logout } from '../../utils/authentication/auth.utils';

export interface IHeader {}

export const ME_QUERY = gql`
  query {
    me {
      email
    }
  }
`;

export const Header: React.FC = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();
  const { data, error, loading } = useQuery(ME_QUERY);

  const headerEmail: any = () => {
    if(loading && !error){
      return 'Loading...'
    }
    if(data && !error){
      return data?.me?.email
    }
    if(error){
      return 'Please login again'
    }
  }

  return (
    <div className="Header">
      <div className="Header__left">
        <div className="Icon Icon__menu" role="button" onClick={() => setSidenavIsOpen(!sidenavIsOpen)}>
          <img src="/images/burger-menu.svg" alt="burger menu" />
        </div>
        <div className="Icon Icon__darkmode">
          <img src="/images/darkmode.svg" alt="darkmode" />
        </div>
      </div>
      <div className="Header__right">
        <Label classNames="mr-1 strong">{headerEmail()}</Label>
        {!loading &&
        <div className="Icon Icon__logout" role="button" onClick={logout}>
          <img src="/images/logout.svg" alt="burger menu" />
        </div>
        }
      </div>
    </div>
  );
};
