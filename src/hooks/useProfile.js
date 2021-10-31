import React, { useEffect, useState } from 'react';
import { errors, SUCCESS } from '../api/constants';
import { getMe, getUserAbout } from '../api/profile';
import { useAuth } from '../providers/AuthProvider';

export default useProfile = username => {
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      (async () => {
        const raw = (username?.length) ? await getUserAbout(token, username) : await getMe(token);
        const json = (username?.length) ? (await raw.json()).data : await raw.json();

        if (raw.ok && raw.status === 200) {
          setData({ ...json, resStatus: SUCCESS });
        } else {
          setData({
            error: "Couldn't get profile information",
            resStatus: errors.NETWORK_ERROR,
          });
        }
      })().then(() => setLoading(false)).catch((err) => { console.log(err); setLoading(false) });
    } else {
      setData({ error: 'Not connected', resStatus: errors.ANONYMOUS });
      setLoading(false);
    }
  }, [token]);

  return { data, loading };
};
