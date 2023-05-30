import { makeRequest } from '../request';

export const axios_register = async (username:string, email: string, password: string) => {

  const response = await makeRequest({
    endpoint: '/users',
    data: {
      username: username,
      email: email,
      password: password,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response;
};
