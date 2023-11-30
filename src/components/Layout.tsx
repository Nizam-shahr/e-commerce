// Layout.tsx
import React from 'react';
import Header from '@/components/Header';
import { SearchProvider } from '../components/context/SearchContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SearchProvider>
      <>
        <Header />
        {children}
      </>
    </SearchProvider>
  );
};

export default Layout;
