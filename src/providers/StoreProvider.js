import React from 'react';
import RuntimeInfoProvider from './RuntimeInfoProvider';
import AuthProvider from './AuthProvider';
import SubredditProvider from './SubredditProvider';

export default StoreProvider = ({children}) => {
  return (
    <RuntimeInfoProvider>
      <AuthProvider>
        <SubredditProvider>{children}</SubredditProvider>
      </AuthProvider>
    </RuntimeInfoProvider>
  );
};
