import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { envConfig } from '@/common/helper/env-config';
import { formatStringify } from '@/common/helper/logging';

import {
  PostLoginPayload,
  PostLoginResponseSuccess,
} from './internal-api.type';

const apiClient = axios.create({
  baseURL: envConfig.EXPO_PUBLIC_SERVER_URL,
});

const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  // const accessToken = getAccessToken();
  const accessToken = '';

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const responseInterceptorSuccess = (response: AxiosResponse) => {
  console.log(
    'API Success\n',
    formatStringify({
      url: response.config.url,
      data: response.data,
    })
  );
  return response;
};

const responseInterceptorError = (error: AxiosError) => {
  // const accessToken = getAccessToken();
  const accessToken = '';

  console.warn(
    'API Error\n',
    formatStringify({
      url: error.config?.url,
      error: error.response?.data,
    })
  );

  // force logout user if got status 401 Unauthorized
  if (error.response?.status === 401 && accessToken) {
    //   handleLogoutSession();
  }

  return Promise.reject(error);
};

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError
);

export const apiPostLogin = async (payload: PostLoginPayload) => {
  const response = await apiClient<PostLoginResponseSuccess>({
    method: 'POST',
    url: '/api/auth/login',
    data: payload,
  });

  return response.data;
};
