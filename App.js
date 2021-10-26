import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/Navigation';
import StoreProvider from './src/providers/StoreProvider';

const theme = {
  ...DarkTheme,
  // dark: Appearance.getColorScheme() === 'dark',
  // mode: 'adaptive',
  roundness: 20,
  // colors: {
  //   ...DarkTheme.colors,
  //   primary: '#fd4018ff',
  // }
}

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StoreProvider>
        <Navigation />
      </StoreProvider>
    </PaperProvider>
  );
};

export default App;