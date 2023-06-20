import { makeRequest } from '../request';

export const axiosSummary = async () => {

  const response = await makeRequest({
    endpoint: '/users/summary',
    data: {
        params: [
            'id',
            'username',
            'email',
            'bio',
            'avatar',
            'minimal_score',
            'local',
            'social_media',
            'hobbies',
            'preferences',
        ]
    }
  }, 'get');

  return response;
};