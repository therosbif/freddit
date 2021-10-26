import { baseUrl } from "./constants";

async function getMe(token) {
  return fetch(`${baseUrl}/api/v1/me`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`
    }
  });
}

export { getMe }