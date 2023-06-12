import { makeRequest } from '../request';

export const axiosSummary = async () => {

  const response = await makeRequest({
    endpoint: '/users/summary',
    data: {
        params: [
            'username',
            'email',
        ]
    }
  }, 'get');

  return response;
};