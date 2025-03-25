import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AccountContext} from '../../../contexts';
import PageLoader from '../../../components/PageLoader/PageLoader';
import {useLogoutMutation} from '../../../api/mutations/auth.mutation';
import {toast} from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  // Account context
  const {setAccount} = useContext(AccountContext);

  // Logout mutation
  const {mutate: logout, isLoading} = useLogoutMutation();

  useEffect(() => {
    // Perform server logout
    logout(null, {
      onSuccess: () => {
        // Clear local account data and redirect
        handleLogoutSuccess();
      },
      onError: (error) => {
        console.error('Failed to log out:', error);
        
        // If the error is due to authentication issues, just clear local data and redirect
        if (error?.unauthenticated) {
          toast.info('Your session has expired. You have been logged out.');
          handleLogoutSuccess();
        } else {
          // For other errors, show a message but still log out locally
          toast.error('Server logout failed, but you have been logged out locally.');
          handleLogoutSuccess();
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout, setAccount, navigate]);

  // Handle successful logout (both server and local)
  const handleLogoutSuccess = () => {
    // Clear local account data
    setAccount({});
    localStorage.removeItem('account');

    // Navigate to login page
    navigate('/login');
  };

  return isLoading ? <PageLoader /> : null;
};

export default Logout;
