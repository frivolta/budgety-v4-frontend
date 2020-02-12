export const setToken = (token: string) => {
  localStorage.removeItem('auth-token');
  localStorage.setItem('auth-token', token);
};

export const asyncSetToken = (token: string) =>
  new Promise((resolve, reject) => {
    try {
      localStorage.removeItem('auth-token');
      localStorage.setItem('auth-token', token);
      resolve(true);
    } catch {
      reject(false);
    }
  });

export const setUserId = (token: string) => {
  localStorage.removeItem('user-id');
  localStorage.setItem('user-id', token);
};

export const logout = () => {
  localStorage.removeItem('user-id');
  localStorage.removeItem('auth-token');
  window.location.href = '/signin';
};
