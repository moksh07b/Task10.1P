import React, { createContext, useContext, useState } from "react";

const SignInContext = createContext();

export const useSignIn = () => {
  return useContext(SignInContext);
};

export const SignInProvider = ({ children }) => {
  const [isSignIn, SetIsSignIn] = useState(false);
  const [userData, SetUserData] = useState(null); // Another state for holding user data, for example

  return (
    <SignInContext.Provider value={{ isSignIn, SetIsSignIn, userData, SetUserData }}>
      {children}
    </SignInContext.Provider>
  );
};
