const BASE_URL = 'https://api.example.com'; // Substitua pela URL base da sua API

const urls: Record<string, string> = {
  "login": `${BASE_URL}/login`,
  "logoff": `${BASE_URL}/logoff`,
  "register": `${BASE_URL}/register`,
  "addHobbie": `${BASE_URL}/hobbie/add`,
  "removeHobbie": `${BASE_URL}/hobbie/remove`,
  "setClientHobbie": `${BASE_URL}/client/set_hobbie`
};

export default urls;