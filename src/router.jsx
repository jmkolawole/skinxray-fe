import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import { Layout } from './layouts/Layout/Layout';
import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Logout from './pages/Auth/Logout/Logout';
import Analysis from './pages/Analysis/Analysis';
import Settings from './pages/Settings/Settings';
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound';

export const router = createBrowserRouter([
  // UNPROTECTED PAGES
  {
    path: '/',
    element: <Landing />,
    index: true,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Login isSignUp={true} />,
      },
    ],
  },
  // PROTECTED PAGES
  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/analysis',
        element: <Analysis />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/settings',
        element: <Settings />,
      }
    ],
  },
  // 404 PAGE
  {
    path: '*',
    element: <NotFound />,
  },
]);
