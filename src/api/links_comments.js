import {baseUrl} from './constants';

async function vote(token, fullname, dir) {
  return fetch(`${baseUrl}/api/vote/`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: `id=${fullname}&dir=${dir}`,
  });
}

export {vote};
