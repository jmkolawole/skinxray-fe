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
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import PricingPage from './pages/Pricing/Pricing';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';

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
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset',
        element: <ResetPassword />,
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
      },
      {
        path: '/pricing',
        element: <PricingPage />,
      },
      {
        path: '/payment/success',
        element: <PaymentSuccess />,
      }
    ],
  },
  // 404 PAGE
  {
    path: '*',
    element: <NotFound />,
  },
]);
