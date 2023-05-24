// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { RequestLogin } from './auth/login';

// type RequestTypes: Record<string, string> = {
//     login: RequestLogin
// }

// interface RequestConfig<T> {
//   data?: T;
//   params?: Record<string, string | number>;
// }

// interface RequestResponse<T> {
//   status: number;
//   headers: Record<string, string>;
//   data: T;
// }

// const buildRequest = async <T>(
//   config: RequestConfig<T>
// ): Promise<RequestResponse<T>> => {
//   const { route, method, data, params } = config;
//   const [context, endpoint] = route.split('/');


//   try {
    
//   } catch (error) {
//     console.error(`Error during ${method} request to ${url}:`, error);
//     throw error;
//   }
// };

// export type { HttpMethod, RequestConfig, RequestResponse };
// export { buildRequest };