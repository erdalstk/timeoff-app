import { getCookie } from '../../utils/cookies';

const baseUrl = 'http://localhost:3000/api/v1/admin';

export const deactivateService = (request) => {
  const DEACTIVATE_ENDPOINT = `${baseUrl}/deactivate`;

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('token')
    },
    body: JSON.stringify(request.id)
  };

  return fetch(DEACTIVATE_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return { error: error };
    })
};