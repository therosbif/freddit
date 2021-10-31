import React, { createContext, useContext, useEffect, useState } from 'react';
import { authorize } from 'react-native-app-auth';
import base64 from 'react-native-base64';
import authConfig from '../authConfig';
import EncryptedStorage from 'react-native-encrypted-storage';

const AuthContext = createContext(null);
const AuthStorage = 'authStorage';

export default AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expirationDate, setExpirationDate] = useState(null);

  const logout = async () => {
    setToken('');
    setRefreshToken('');
    return EncryptedStorage.removeItem(AuthStorage);
  };

  const storeAuth = async () => {
    return EncryptedStorage.setItem(
      AuthStorage,
      JSON.stringify({
        token,
        refreshToken,
        expirationDate,
      }),
    );
  };

  const getAuth = async () => {
    return new Promise((resolve, reject) =>
      EncryptedStorage.getItem(AuthStorage)
        .then(async data => {
          console.log(data);
          if (!data) {
            return reject(false);
          }
          const parsed = JSON.parse(data);

          setRefreshToken(parsed.refreshToken);
          setToken(parsed.token);
          setExpirationDate(parsed.expirationDate ? parsed.expirationDate : 1);
          return resolve(true);
        })
        .catch(err => {
          console.log(err);
          return reject(false);
        }),
    );
  };

  const setAuth = async () => {
    if ((!token || token.length === 0) && refreshToken.length === 0) {
      return authorize(authConfig)
        .then(data => {
          console.log(data);
          if (data.accessToken.length !== 0) {
            setRefreshToken(data.refreshToken);
            setToken(data.accessToken);
            setExpirationDate(
              new Date(data.accessTokenExpirationDate).getTime(),
            );
          }
        })
        .catch(err => console.log(err));
    }
  };

  const refreshAccessToken = async () => {
    console.log("REFRESHING ACCESS TOKEN");
    return fetch(`https://www.reddit.com/api/v1/access_token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode(authConfig.clientId + ':')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    })
      .then(res => {
        if (res.ok) {
          return res.json().then(data => {
            console.log("izfbzmiebfzef");
            console.log(data.expires_in);
            setExpirationDate(Date.now() + data.expires_in * 1000);
            setToken(data.access_token);
          });
        }
      })
      .catch(err => {
        console.log('ERROR WHILE REFRESHING:');
        console.log(err);
      });
  };

  useEffect(() => {
    if (token && token?.length) {
      storeAuth();
    }
  }, [token]);

  useEffect(() => {
    getAuth().catch(() => console.log('NO TOKEN STORED'));
  }, []);

  useEffect(() => {
    if (expirationDate) {
      if (expirationDate - Date.now() < 120000) {
        console.log("REFRESHING ACCESS TOKEN AT LAUNCH");
        refreshAccessToken();
      } else {
        console.log("SETTING TIMEOUT FOR REFRESH");
        setTimeout(refreshAccessToken, expirationDate - Date.now() - 3000000);
      }
    }
  }, [expirationDate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setAuth,
        logout,
        refreshAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
