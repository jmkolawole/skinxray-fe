import {useEffect, useState, useCallback} from 'react';
import {AccountContext} from '..';
import PropTypes from 'prop-types';

// Pull local storage data
const localAccountData = localStorage.getItem('account') ?? '{}';

const AccountProvider = ({children}) => {
  /**
   * Account data structure
   * {
   *   user: object,
   *   token: string
   * }
   */
  const [account, setAccount] = useState(JSON.parse(localAccountData));

  // Clear account data and localStorage
  const clearAccount = useCallback(() => {
    setAccount({});
    localStorage.removeItem('account');
  }, []);

  // Check if token exists and is valid
  const isAuthenticated = useCallback(() => {
    return (
      Object.keys(account).length > 0 &&
      account.user &&
      account.token
    );
  }, [account]);

  // Update localStorage when account changes
  useEffect(() => {
    if (Object.keys(account).length > 0) {
      localStorage.setItem('account', JSON.stringify(account));
    }
  }, [account]);

  return (
    <AccountContext.Provider value={{account, setAccount, clearAccount, isAuthenticated}}>
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node,
};

export default AccountProvider;
