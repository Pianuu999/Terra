import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    selectedRegions: [],
    selectedCategory: '',
    selectedSubCategory: '',
    recommendations: [],
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};