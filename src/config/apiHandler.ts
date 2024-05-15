import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getHeaders, logout } from 'helper/config';
import { store } from '../store/index';
import { openSnackbar } from 'store/reducers/snackbar';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const axiosBaseClient = (type: 'base'): AxiosInstance => {
  return axios.create({
    baseURL: type === 'base' ? baseUrl : baseUrl
  });
};

const axiosClient = axiosBaseClient('base');
const api = (axiosVal: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
      return axiosVal.get<T>(url, config);
    },
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
      return axiosVal.post<T>(url, body, config);
    },
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axiosVal.put<T>(url, body, config);
    },
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return axiosVal.delete<T>(url, config);
    },
    patch: <T>(url: string, body?: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
      return axiosVal.patch<T>(url, body, config);
    },

    putFormData: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
      return axiosVal.put<T>(url, body, { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } });
    },
    postFormData: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
      console.log(config.headers);
      return axiosVal.post<T>(url, body, { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } });
    }
  };
};
const requestHandler = async (request: AxiosRequestConfig): Promise<any> => {
  request.headers = getHeaders();
  return request;
};

const responseHandler = async (response: any): Promise<any> => {
  const { config } = response;
  return response;
};
const errorHandler = (error: AxiosError<AxiosError>) => {
  const { response } = error;
  console.log(response);
  // @ts-ignore
  const message = response?.data?.error;
  const messageError = response?.data?.message;
  const status = response?.data?.status;
  if (status === 401) {
    //logout
    console.log('----------');
    logout();
  }
 else if (Array.isArray(message)) {
    store.dispatch(
      openSnackbar({
        open: true,
        message: messageError,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'error'
        },
        close: false
      })
    );
  }
 else if (message) {
    console.log(response);
    store.dispatch(
      openSnackbar({
        open: true,
        message: message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'error'
        },
        close: false
      })
    );
  }
  throw new Error(message);
};

axiosClient.interceptors.request.use(requestHandler, errorHandler);
axiosClient.interceptors.response.use(responseHandler, errorHandler);
export const apiClient = api(axiosClient);
