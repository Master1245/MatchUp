import axios from 'axios';

interface RequestData {
  [key: string]: string;
}

interface RequestConfig {
  endpoint: string;
  data?: RequestData;
  headers?: Record<string, string>;
}

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const endpoint = config.url?.replace(/^\//, '');

    if (endpoint && !['login', 'register'].includes(endpoint)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export const makeRequest = async (config: RequestConfig) => {
  const { endpoint, data, headers } = config;

  const requestData = data;

  const response = await axiosInstance.post(endpoint, requestData, { headers });

  return response.data;
};