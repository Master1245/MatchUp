import { makeRequest } from '../request';

export const axios_login = async (email: string, password: string) => {

  const response = await makeRequest({
    endpoint: '/login',
    data: {
      username: email,
      password: password,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }, 'post');

  return response;
};
