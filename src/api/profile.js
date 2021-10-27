import { baseUrl } from "./constants";

async function getMe(token) {
  return fetch(`${baseUrl}/api/v1/me`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`
    }
  });
}

async function getUserAbout(token, username) {
  return fetch(`${baseUrl}/user/${username}/about`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`
    }
  })
}

export { getMe, getUserAbout }