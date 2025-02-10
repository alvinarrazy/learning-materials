import { camelizeKeys, toSnakeKeys } from '@/utils/service';
import axios from 'axios';

const BE_URL = 'https://delta-indie.vercel.app';

const api = (() => {
  const axiosApi = axios.create();
  axiosApi.interceptors.request.use(
    async (config) => {
      config = {
        ...config,
        withCredentials: true,
        baseURL: BE_URL,
      };

      config.data = toSnakeKeys(config.data);

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosApi.interceptors.response.use(
    (response) => {
      response.data = camelizeKeys(response.data.data);
      return response;
    },
    // async (error: AxiosError) => {
    async () => {
      let customError;

      //Handle error

      return Promise.reject(customError);
    },
  );
  return axiosApi;
})();

export default api;
