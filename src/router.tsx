import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import TransactionDetail from './pages/TransactionDetail';

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
        path: 'tx/:hash',
        element: <TransactionDetail />,
      },
    ],
  },
]); 