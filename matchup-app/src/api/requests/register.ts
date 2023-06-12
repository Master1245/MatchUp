import { makeRequest } from '../request';

export const axiosRegister = async (username:string, email: string, password: string) => {

  const response = await makeRequest({
    endpoint: '/users',
    data: {
      username: username,
      email: email,
      password: password,
    }
  }, 'post');

  return response;
};