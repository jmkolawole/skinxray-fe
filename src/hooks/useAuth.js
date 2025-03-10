import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../contexts';
import { toast } from 'react-toastify';

/**
 * Custom hook for authentication-related functionality
 */
const useAuth = () => {
  const navigate = useNavigate();
  const { account, setAccount, clearAccount, isAuthenticated } = useContext(AccountContext);

  /**
   * Handle logout
   */
  const logout = useCallback(() => {
    clearAccount();
    navigate('/login');
  }, [clearAccount, navigate]);

  /**
   * Handle token expiration
   */
  const handleTokenExpiration = useCallback(() => {
    toast.error('Your session has expired. Please log in again.');
    logout();
  }, [logout]);

  return {
    account,
    setAccount,
    isAuthenticated,
    logout,
    handleTokenExpiration
  };
};

export default useAuth; 