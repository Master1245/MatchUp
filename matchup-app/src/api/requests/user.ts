import { makeRequest } from '../request';

export const axiosLogin = async (email: string, password: string) => {

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

export const axiosLogout = async () => {

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

export const axiosUpdateSummary = async (data: any) => {

    const response = await makeRequest({
        endpoint: '/users/me',
        data: data
    }, 'put');

    return response;
}
