// SearchContext.tsx
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface SearchContextProps {
  searchProductByName: string;
  setSearchProductByName: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchProductByName, setSearchProductByName] = React.useState<string>('');
  const contextValue = { searchProductByName, setSearchProductByName };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
