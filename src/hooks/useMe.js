import React, {useEffect} from 'react';
import {useState} from 'react';
import {errors, SUCCESS} from '../api/constants';
import {getMe} from '../api/profile';
import {useAuth} from '../providers/AuthProvider';

export default useMe = () => {
  const {token} = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      (async () => {
        const raw = await getMe(token);

        if (raw.ok && raw.status === 200) {
          setData({...(await raw.json()), resStatus: SUCCESS});
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
