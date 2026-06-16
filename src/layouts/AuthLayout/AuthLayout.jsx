import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AccountContext } from '../../contexts';
import { ThemeToggle } from '../../ds';
import { has } from 'lodash';
import { useEffect } from 'react';
import * as S from './AuthLayout.style';

const pageTitleMap = {
  '/login': 'Login',
  '/auth/google': 'Login',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/signup': 'Sign Up',
};

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AccountContext);
  // eslint-disable-next-line no-unused-vars
  const [renderOutlet, setRenderOutlet] = useState(false);

  // Redirect if logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    } else {
      setRenderOutlet(true);

      if (has(pageTitleMap, location.pathname)) {
        document.getElementsByTagName('title')[0].innerText = `Skinxray - ${
          pageTitleMap[location.pathname]
        }`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, isAuthenticated, location.pathname]);

  return (
    <S.Container>
      <S.AuthTopBar>
        <ThemeToggle />
      </S.AuthTopBar>
      <S.InnerContainer>
        <S.AuthCard>
          <Outlet />
        </S.AuthCard>
      </S.InnerContainer>
    </S.Container>
  );
};

export default AuthLayout;
