import AppShell from '../../components/AppShell/AppShell';
import PageLoader from '../../components/PageLoader/PageLoader';
import TawkWidget from '../../components/TawkWidget/TawkWidget';
import { AccountContext } from '../../contexts';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {
  const navigate = useNavigate();
  const { account, isAuthenticated } = useContext(AccountContext);
  const [renderOutlet, setRenderOutlet] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setRenderOutlet(true);
    } else {
      navigate('/');
    }
  }, [account, navigate, isAuthenticated]);

  if (!renderOutlet) {
    return <PageLoader />;
  }

  return (
    <AppShell>
      <Outlet />
      <TawkWidget />
    </AppShell>
  );
};
