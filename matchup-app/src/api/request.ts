import axios from 'axios';

interface RequestData {
  [key: string]: string;
}

interface RequestConfig {
  endpoint: string;
  data: RequestData;
  body?: RequestData;
  headers?: Record<string, string>;
}

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const endpoint = config.url?.replace(/^\//, '');

    if (endpoint && !['login', 'logout'].includes(endpoint)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const makeRequest = async (config: RequestConfig) => {
  const { endpoint, data, body, headers } = config;

  const formattedData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    formattedData.append(key, value);
  });

  const response = await axiosInstance.post(endpoint, formattedData, { headers });

  return response.data;
};