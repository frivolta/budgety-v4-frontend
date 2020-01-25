export const setToken = (token: string) => {
  localStorage.removeItem('access-token');
  localStorage.setItem('access-token', token);
};

export const setUserId = (token: string) => {
  localStorage.removeItem('auser-id');
  localStorage.setItem('user-id', token);
};
