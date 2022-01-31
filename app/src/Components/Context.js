import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    burguer: false,
    error: "",
    token: "",
    route: "",
    offset: false,
  };

  const [state, setState] = useState(initialState);
  console.log(state);

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
};
