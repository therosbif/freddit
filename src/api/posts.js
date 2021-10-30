import RTURL from '../utils/RTUrl';
import {baseUrl} from './constants';

async function getSubPostsListing({
  token,
  subreddit,
  count,
  limit,
  before,
  after,
}) {
  return fetch(
    `${baseUrl}/${subreddit}/${RTURL.asQueryParams({
      count,
      limit,
      before,
      after,
    })}`,
    {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    },
  );
}

export {getSubPostsListing};
