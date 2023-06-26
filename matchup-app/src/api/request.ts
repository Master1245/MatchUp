import axios from 'axios';

interface RequestData {
  [key: string]: string;
}

interface RequestConfig {
  endpoint: string;
  data?: RequestData | String[] | any;
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
      console.log(config.headers);
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

type methodRequest = 'get' | 'post' | 'put' | 'delete';
export const makeRequest = async (config: RequestConfig, method: methodRequest) => {
  const { endpoint, data, headers } = config;

  const requestData = data;

  if (method === 'get') {
    //transform data to query string to passed in url if numbers not index passed
    const query = Object.keys(requestData)
      .map((key) => {
        if(Array.isArray(requestData[key])){
          return `${key}=${requestData[key].join(',')}`;
        }
        return `${key}=${requestData[key]}`;
      })
      .join('&');

    const response = await axiosInstance.get(`${endpoint}?${query}`, { headers });

    return response.data;
  }
  if (method === 'put') {
    const response = await axiosInstance.put(endpoint, requestData, { headers });

    return response.data;
  }
  const response = await axiosInstance.post(endpoint, requestData, { headers });

  return response.data;
};