import { makeRequest } from '../request';

export const axios_register = async (username:string, email: string, password: string) => {

  const response = await makeRequest({
    endpoint: '/users',
    body: {
      username: username,
      email: email,
      password: password,
    },
    data: {},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
  });

  return response;
};
