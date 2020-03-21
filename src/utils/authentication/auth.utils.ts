import { IApiUserDetails, ITokens } from "../../types";

// Types
interface ISetUserToLocalStorage {
  (userDetails: IApiUserDetails): void;
}

export const setUserToLocalStorage: ISetUserToLocalStorage = userDetails => {
  localStorage.removeItem("user");
  localStorage.removeItem("tokens");
  localStorage.setItem("user", JSON.stringify(userDetails.user));
  localStorage.setItem("tokens", JSON.stringify(userDetails.tokens));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("tokens");
  window.location.href = "/signin";
};

export const getUser = (): IApiUserDetails | undefined => {
  const localStorageTokens = localStorage.getItem("tokens");
  const localStorageuser = localStorage.getItem("user");
  return localStorageuser && localStorageTokens
    ? { user: JSON.parse(localStorageuser), tokens: JSON.parse(localStorageTokens) }
    : undefined;
};

export const getTokenFromLocalStorage = (): string | undefined => {
  const localStorageTokens = localStorage.getItem("tokens");
  if (localStorageTokens) {
    const parsedTokens: ITokens = JSON.parse(localStorageTokens);
    return parsedTokens.access.token;
  }
  return undefined;
};

/**
 * Verify if user is signed-in.
 * @summary  get localstorage jwt, verify if it is expired.
 * @return {boolean} true if user is signed in
 */

export const verifyAuthUser = (): boolean => {
  const localStorageTokens = localStorage.getItem("tokens");
  if (localStorageTokens) {
    const tokens: ITokens = JSON.parse(localStorageTokens);
    const currentTime: string = Date.now().toString();
    const isExpired: boolean = tokens.access.expires < currentTime;
    isExpired && removeUserFromLocalStorage();
    return !isExpired;
  }
  return false;
};
