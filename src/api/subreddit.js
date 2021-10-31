import {baseUrl} from './constants';

async function getSubredditInfo(token, subreddit) {
  return fetch(`${baseUrl}/r/${subreddit}/about`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
}

export {getSubredditInfo};
