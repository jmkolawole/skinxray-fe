import {useContext, useEffect, useState} from 'react';
import {AccountContext} from '../../contexts';
import {Outlet, useNavigate} from 'react-router-dom';
import PageLoader from '../../components/PageLoader/PageLoader';
import Topbar from '../../components/Topbar/Topbar';
import TawkWidget from '../../components/TawkWidget/TawkWidget';

export const Layout = () => {
  const navigate = useNavigate();
  const {account, isAuthenticated} = useContext(AccountContext);
  const [renderOutlet, setRenderOutlet] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setRenderOutlet(true);
    } else {
      // If not authenticated, redirect to landing page
      navigate('/');
    }
  }, [account, navigate, isAuthenticated]);

  return (
    <div>
      {renderOutlet ? (
        <div>
          <Topbar />
          <Outlet />
          <TawkWidget />
        </div>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};
