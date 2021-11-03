import React, {createContext, useContext, useEffect, useState} from 'react';

const PropContext = createContext(null);

export default PropProvider = ({children}) => {
  const [screens, setScreens] = useState([]);

  const newScreen = (params) => {
    setScreens([...screens, params]);

    return screens.length() - 1;
  };

  const destroyScreen = (screenId) => {
    if (screenId === 0) {
      setScreens(screens.slice(1));
    }
    setScreens([...screens.slice(0, screenId), ...screens.slice(screenId + 1)]);
  };

  const getParams = (screenId) => {
    return screens[screenId];
  };

  return (
    <PropContext.Provider
      value={{
        newScreen,
        destroyScreen,
        getParams,
      }}>
      {children}
    </PropContext.Provider>
  );
};

const usePropProvider = () => useContext(PropContext);

export {usePropProvider};
