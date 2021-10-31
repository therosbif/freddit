import React from 'react';
import RuntimeInfoProvider from './RuntimeInfoProvider';
import AuthProvider from './AuthProvider';
import PropProvider from './PropProvider';

export default StoreProvider = ({ children }) => {
  return (
    <RuntimeInfoProvider>
      <AuthProvider>
        <PropProvider>
          {children}
        </PropProvider>
      </AuthProvider>
    </RuntimeInfoProvider>
  );
};
