import ThemeProvider from "./ThemeProvider";
import React from "react";
import RuntimeInfoProvider from "./RuntimeInfoProvider";

export default StoreProvider = ({ children }) => {

  return (
    <ThemeProvider>
      <RuntimeInfoProvider>
        {children}
      </RuntimeInfoProvider>
    </ThemeProvider>
  );
}