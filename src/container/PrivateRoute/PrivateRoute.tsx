import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: any;
  isSignedIn: boolean | Promise<boolean>;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isSignedIn, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        isSignedIn
          ? <Component {...routeProps} />
          : <Redirect
              to={{
                pathname: '/signin',
                state: { from: routeProps.location }
              }}
            />}
    />
  );
};
