import React from 'react';
import Navigation from './src/navigation/Navigation';
import StoreProvider from './src/providers/StoreProvider';

const App = () => {
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  );
};

export default App;