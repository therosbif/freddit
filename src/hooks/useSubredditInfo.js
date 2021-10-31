import React, { useEffect } from 'react';
import { useState } from 'react';
import { errors, SUCCESS } from '../api/constants';
import { getSubredditInfo } from '../api/subreddit';
import { useAuth } from '../providers/AuthProvider';

export default useSubredditInfo = (subreddit) => {
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      (async () => {
        const raw = await getSubredditInfo(token, subreddit);

        if (raw.ok && raw.status === 200) {
          setData({ ...(await raw.json()), resStatus: SUCCESS });
        } else {
          setData({
            error: "Couldn't get subreddit information",
            resStatus: errors.NETWORK_ERROR,
          });
        }
      })().then(() => setLoading(false));
    } else {
      setData({ error: 'Not connected', resStatus: errors.ANONYMOUS });
      setLoading(false);
    }
  }, [token]);

  return { data, loading };
};
