import api from '../request';

export const axios_login = async (email: string, password: string) => {
    const data = new URLSearchParams();
    data.append('grant_type', '');
    data.append('username', email);
    data.append('password', password);
    data.append('scope', '');
    data.append('client_id', '');
    data.append('client_secret', '');

    const response = await api.post('/login', data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    return response.data;
}