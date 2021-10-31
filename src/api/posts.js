import RTURL from '../utils/RTUrl';
import { baseUrl } from './constants';

async function getSubPostsListing({
  token,
  subreddit = '',
  mode = 'hot',
  count,
  limit,
  before,
  after,
}) {
  subreddit = subreddit.length === 0 ? '' : '/' + subreddit;
  return fetch(
    `${baseUrl}${subreddit}/${mode}/${RTURL.asQueryParams({
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

export { getSubPostsListing };
