import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext(null);
const darkModeStorage = 'darkMode';

const lightPalette = {
  BACKGROUND: 0Xfafafaff,
  BORDER: 0x4f4f4fff,
  PRIMARY: 0xfd4018ff,
  SECONDARY: 0x4f4f4fff,
  TEXT: 0x000000ff,
}

const darkPalette = {
  BACKGROUND: 0x232323ff,
  BORDER: 0x4f4f4fff,
  PRIMARY: 0xfd4018ff,
  SECONDARY: 0x4f4f4fff,
  TEXT: 0xffffffff,
}

const isDarkMode = () => Appearance.getColorScheme() == 'dark'

export default ThemeProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(isDarkMode());
  const [palette, setPalette] = useState(lightPalette);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(darkModeStorage);
      if (value) {
        const parsed = JSON.parse(value);

        if (parsed) {
          setDarkMode(parsed)
        }
      } else {
        await AsyncStorage.setItem(darkModeStorage, 'true');
      }
    })().then(() => {
      setLoaded(true);
    })
  }, []);

  useEffect(() => {
    setLoaded(false);
    (async () => {
      AsyncStorage.setItem(darkModeStorage, JSON.stringify(darkMode));
    })().catch((err) => {
      console.log(err);
    });
    setPalette((darkMode) ? darkPalette : lightPalette);
    setLoaded(true);
  }, [darkMode])

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        palette,

        loaded,
        setDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext);

export { useTheme };