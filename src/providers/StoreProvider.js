import React from "react";
import RuntimeInfoProvider from "./RuntimeInfoProvider";
import AuthProvider from "./AuthProvider";

export default StoreProvider = ({ children }) => {

  return (
    <RuntimeInfoProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </RuntimeInfoProvider>
  );
}