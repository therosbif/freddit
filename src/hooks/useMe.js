import React, { useEffect } from "react";
import { useState } from "react";
import { errors } from "../api/constants";
import { getMe } from "../api/profile";
import { useAuth } from "../providers/AuthProvider";

const SUCCESS = 0;

export default useMe = () => {
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(token);
    if (token) {
      (async () => {
        const raw = await getMe(token);

        if (raw.ok && raw.status === 200) {
          setData({ ...(await raw.json()), resStatus: SUCCESS });
        } else {
          setData({ error: "Couldn't get profile information", resStatus: errors.NETWORK_ERROR });
        }
      })().then(() =>
        setLoading(false)
      )
    } else {
      setData({ error: "Not connected", resStatus: errors.ANONYMOUS });
      setLoading(false)
    }
  }, [])

  return { data, loading };
}