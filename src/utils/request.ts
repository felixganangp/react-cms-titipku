import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

const http = axios.create({
  baseURL: VITE_APP_API_URL,
});

const getToken = () => {
  try {
    const storegeAuth = localStorage.getItem('auth');
    if (!storegeAuth) return false;

    const { token } = JSON.parse(storegeAuth);
    if (token) {
      return token;
    }
    return false;
  } catch (error) {
    return false;
  }
};
const token = getToken();

if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.replace('/sign-in');
      }
    }
    return Promise.reject(error);
  },
);

export default http;
