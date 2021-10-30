import React from 'react';
import RuntimeInfoProvider from './RuntimeInfoProvider';
import AuthProvider from './AuthProvider';
import ModeProvider from './ModeProvider';

export default StoreProvider = ({children}) => {
  return (
    <RuntimeInfoProvider>
      <AuthProvider>
        <ModeProvider>{children}</ModeProvider>
      </AuthProvider>
    </RuntimeInfoProvider>
  );
};
