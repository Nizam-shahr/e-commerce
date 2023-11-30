// app.tsx
import '../styles/globals.css'
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Layout from '@/components/Layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer/>
    </Provider>
  );
};

export default MyApp;
