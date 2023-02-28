export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const clearToken = function () {
  localStorage.removeItem('token');
};
