import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AccountContext = createContext({
  account: null,
  setAccount: () => {},
});

export const AccountProvider = ({ children }) => {
  const [account, setAccountState] = useState(() => {
    const savedAccount = localStorage.getItem('account');
    return savedAccount ? JSON.parse(savedAccount) : null;
  });

  const setAccount = (newAccount) => {
    if (newAccount) {
      localStorage.setItem('account', JSON.stringify(newAccount));
    } else {
      localStorage.removeItem('account');
    }
    setAccountState(newAccount);
  };

  // Effect to handle initial load and sync with localStorage
  useEffect(() => {
    const savedAccount = localStorage.getItem('account');
    if (savedAccount) {
      setAccountState(JSON.parse(savedAccount));
    }
  }, []);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 