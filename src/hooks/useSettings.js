import React, { useEffect, useState } from "react";
import { getPrefs } from "../api/profile";
import { useAuth } from "../providers/AuthProvider";

export default useSettings = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getPrefs(token);

      if (res.ok && res.status === 200) {
        setData(await res.json());
      } else {
        setData({ error: res.status })
      }
      setLoading(false);
    })()
  }, [])

  return { loading, data };
}