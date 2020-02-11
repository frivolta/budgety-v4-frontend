import { useState, useReducer, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

enum useUserDetailActions {
  SET_LOGGED_IN_USER,
  SET_LOGGED_OUT_USER
}

type useUserDetailActionType =
  | { type: useUserDetailActions.SET_LOGGED_IN_USER; payload: UserDetailType }
  | { type: useUserDetailActions.SET_LOGGED_OUT_USER; payload: UserDetailType };

export type UserDetailType = {
  userIsLoggedIn: boolean;
  userEmail: string | undefined;
  userId: string | undefined;
};

const initialState: UserDetailType = {
  userIsLoggedIn: false,
  userEmail: undefined,
  userId: undefined
};

function reducer(
  state: UserDetailType,
  action: useUserDetailActionType
): UserDetailType {
  switch (action.type) {
    case useUserDetailActions.SET_LOGGED_IN_USER:
      return {
        userIsLoggedIn: action.payload.userIsLoggedIn,
        userEmail: action.payload.userEmail,
        userId: action.payload.userId
      };
    case useUserDetailActions.SET_LOGGED_OUT_USER:
      return initialState;
  }
}

export const useUserDetail = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
