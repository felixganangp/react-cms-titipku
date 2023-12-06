import axios, { AxiosRequestConfig } from 'axios';
// config
const { VITE_APP_API_URL } = import.meta.env;

type FetcherType = {
  url: string;
  handleError?: (Error: any) => void;
  data?: any;
  method: 'post' | 'get' | 'delete' | 'put';
  config?: any;
} & AxiosRequestConfig;

// ----------------------------------------------------------------------
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

const axiosInstance = axios.create({ baseURL: VITE_APP_API_URL });

axiosInstance.interceptors.request.use(async (request) => {
  const token = getToken();

  if (token) {
    request.headers.Authorization = `${token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.replace('/sign-in');
      }
    }
    return Promise.reject(error.response || 'Something went wrong');
  },
);
export { axiosInstance };
export const fetcher = async (args: FetcherType) => {
  const { handleError, url, data, method, ...config } = args;
  return new Promise<any>(async (resolve, reject) => {
    try {
      const isNotNeedPayload = method === 'get';
      const response = await axiosInstance[method](
        url,
        isNotNeedPayload ? config : data,
        !isNotNeedPayload ? config : undefined,
      );
      resolve(response.data as unknown);
    } catch (error) {
      reject(handleError ? handleError(error) : error);
    }
  });
};

export default fetcher;
