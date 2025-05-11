import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import TransactionDetail from './pages/TransactionDetail.tsx';
import WalletPage from './components/WalletPage.tsx';
import SearchRedirect from './pages/SearchRedirect.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <SearchRedirect />,
      },
      {
        path: 'tx/:hash',
        element: <TransactionDetail />,
      },
      {
        path: 'wallet/:address',
        element: <WalletPage />,
      },
    ],
  }
]);

export default router; 