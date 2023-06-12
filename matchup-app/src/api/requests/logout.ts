import { makeRequest } from '../request';

export const axios_logout = async () => {

  const response = await makeRequest({
    endpoint: '/logout',
    data: {},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }, 'post');

  return response;
};
