import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({});

  return (
    <DataContext.Provider value={{
      usuario, setUsuario
    }}>
      {children}
    </DataContext.Provider>
  );
};