import { useState } from 'react';

export const useUserDetail = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

  return { userIsLoggedIn, setUserIsLoggedIn };
};
