import { IError, IApiUserDetails } from "../../types";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  authActionTypes
} from "../../types/authActionTypes";

export interface IAuthState {
  user: IApiUserDetails | undefined;
  isSigninUp: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  error: IError;
}

const authDefaultState: IAuthState = {
  user: undefined,
  isLoggedIn: false,
  isSigninUp: false,
  isLoggingIn: false,
  error: { hasErrors: false, message: undefined }
};

const authReducer = (state = authDefaultState, action: authActionTypes): IAuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        error: { hasErrors: false, message: undefined }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        user: action.user,
        error: { hasErrors: false, message: undefined }
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        user: undefined,
        error: action.error
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSigninUp: true,
        isLoggingIn: false,
        isLoggedIn: false,
        error: { hasErrors: false, message: undefined }
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSigninUp: false,
        isLoggedIn: false
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isSigninUp: false,
        error: action.error
      };
    case LOGOUT:
      return state;

    default:
      return state;
  }
};

export { authReducer };
