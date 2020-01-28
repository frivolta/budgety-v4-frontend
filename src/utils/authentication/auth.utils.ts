export const setToken = (token: string) => {
  localStorage.removeItem('auth-token');
  localStorage.setItem('auth-token', token);
};

export const setUserId = (token: string) => {
  localStorage.removeItem('user-id');
  localStorage.setItem('user-id', token);
};
