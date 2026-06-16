import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import AccountProvider from './contexts/Account/AccountProvider.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import {Bounce, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './ds/global.style.js';
import { router } from './router.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyle />

        <AccountProvider>
          <RouterProvider router={router} />
        </AccountProvider>
      </ThemeProvider>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {import.meta.env.DEV && (
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </HelmetProvider>
);
