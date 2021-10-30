import React, {useEffect, useState} from 'react';
import {errors, SUCCESS} from '../api/constants';
import {getUserAbout} from '../api/profile';
import {useAuth} from '../providers/AuthProvider';
import useMe from './useMe';

export default useProfile = username => {
  const {token} = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const {meData, meLoading} = useMe();

  useEffect(() => {
    if (!username || username.length === 0) {
      return {meData, meLoading};
    }
    if (token) {
      (async () => {
        const raw = await getUserAbout(token, username);

        if (raw.ok && raw.status === 200) {
          setData({...(await raw.json()).data, resStatus: SUCCESS});
        } else {
          setData({
            error: "Couldn't get profile information",
            resStatus: errors.NETWORK_ERROR,
          });
        }
      })().then(() => setLoading(false));
    } else {
      setData({error: 'Not connected', resStatus: errors.ANONYMOUS});
      setLoading(false);
    }
  }, [token]);

  return {data, loading};
};
