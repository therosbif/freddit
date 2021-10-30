import React, {createContext, useContext, useState} from 'react';
import {View, Text} from 'react-native-paper';

const ModeContext = createContext();

export default function ModeProvider({children}) {
  const [mode, setMode] = useState('Hot');

  return (
    <ModeContext.Provider value={{mode, setMode}}>
      {children}
    </ModeContext.Provider>
  );
}

const useMode = () => useContext(ModeContext);

export {useMode};
