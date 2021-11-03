import React from 'react';
import { DarkTheme, Portal, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/Navigation';
import StoreProvider from './src/providers/StoreProvider';

const theme = {
  ...DarkTheme,
  roundness: 20,
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StoreProvider>
        <Portal.Host>
          <Navigation />
        </Portal.Host>
      </StoreProvider>
    </PaperProvider>
  );
};

export default App;
