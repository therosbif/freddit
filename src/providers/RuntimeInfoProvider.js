import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const RuntimeInfoContext = createContext(null);
const runtimeInfoStorage = 'runtimeInfo';

export default RuntimeInfoProvider = ({ children }) => {
  const [reload, setReload] = useState(0);
  const [splashScreen, setSplashScreen] = useState(true);
  const [firstRun, setFirstRun] = useState(true);

  const reset = async () => {
    return new Promise((resolve, reject) => AsyncStorage.removeItem(runtimeInfoStorage)
      .then(() => {
        setReload(0);
        return resolve('Ok');
      }).catch((err) => {
        console.log(err);
        return reject('Couldn\'t reset settings');
      }))
  }

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(runtimeInfoStorage);

      if (value) {
        const parsed = JSON.parse(value);

        if (parsed) {
          setFirstRun(parsed.first_run);
        }
      } else {
        await AsyncStorage.setItem(runtimeInfoStorage, JSON.stringify({
          first_run: firstRun,
        }));
      }
    })().then(() => {
      //setTimeout(() => { setSplashScreen(false) }, 5000);
      setSplashScreen(false);
    })
  }, [reload])

  useEffect(() => {
    if (firstRun === false) {
      (async () => {
        await AsyncStorage.setItem(runtimeInfoStorage, JSON.stringify({
          first_run: firstRun,
        }));
      })()
    }
  }, [firstRun])

  return (
    <RuntimeInfoContext.Provider
      value={{
        firstRun,
        splashScreen,
        reset,
        setFirstRun,
      }}>
      {children}
    </RuntimeInfoContext.Provider>
  );
}

const useRuntimeInfo = () => useContext(RuntimeInfoContext);

export { useRuntimeInfo };