import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authorize, refresh } from "react-native-app-auth";
import base64 from "react-native-base64";
import { baseUrl } from "../api/constants";
import authConfig, { refreshConfig } from "../authConfig";

const AuthContext = createContext(null);
const AuthStorage = 'authStorage';

export default AuthProvider = ({ children }) => {
  const [reload, setReload] = useState(0);
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());

  const setAuth = async () =>
    authorize(authConfig).then(data => {
      console.log(data);
      if (data.accessToken.length !== 0) {
        setExpirationDate(data.accessTokenExpirationDate);
        setRefreshToken(data.refreshToken);
        setToken(data.accessToken);
      }
    }).catch(err => console.log(err));

  const refreshAccessToken = () => {
    fetch(`https://www.reddit.com/api/v1/access_token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode(authConfig.clientId + ':')}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    }).then(res => res.json()).then((data) => {
      setToken(data.accessToken);
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    if (refreshToken.length !== 0 && token.length !== 0) {
      setTimeout(refreshAccessToken, 58 * 60 * 1000);
    }
  }, [refreshToken])

  return (
    <AuthContext.Provider
      value={{
        token,
        setAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth };