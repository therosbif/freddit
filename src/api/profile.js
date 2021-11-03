import { baseUrl } from './constants';

async function getMe(token) {
  return fetch(`${baseUrl}/api/v1/me`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
}

async function getUserAbout(token, username) {
  return fetch(`${baseUrl}/user/${username}/about`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
}

async function getPrefs(token) {
  return fetch(`${baseUrl}/api/v1/me/prefs`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
}

async function setPrefs(token, settings) {
  return fetch(`${baseUrl}/api/v1/me/prefs`, {
    method: 'PATCH',
    body: JSON.stringify(settings),
    headers: {
      Authorization: `bearer ${token}`,
      "Content-type": 'application/json'
    }
  })
}

export { getMe, getUserAbout, getPrefs, setPrefs };
