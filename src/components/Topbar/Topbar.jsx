import {useContext, useRef, useState} from 'react';
import * as S from './Topbar.style';
import {useNavigate} from 'react-router-dom';
import {Avatar, Icon, Menu} from '../../ds';
import {AccountContext} from '../../contexts';
import { getImagesUrl } from '../../api';

const Topbar = () => {
  const {account} = useContext(AccountContext);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  const menuItems = [
    {
      text: 'Settings',
      icon: 'cog',
      color: 'neutral.700',
      action: handleSettings,
    },
    {
      text: 'Logout',
      icon: 'logout',
      color: 'neutral.700',
      action: handleLogout,
    },
  ];

  return (
    <S.Container>
      <div style={{cursor:'pointer'}} onClick={() => navigate('/')}>
        <Icon name={'home'} color='primary.1000'/>
      </div>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        ref={menuRef}
        style={{cursor: 'pointer'}}
      >
        <Avatar
          size={48}
          type={account.user.avatar ? 'image' : 'text'}
          value={
            account.user.avatar
              ? getImagesUrl(account.user.avatar)
              : account.user.email
          }
        />
        {openMenu && (
          <div
            style={{position: 'absolute', top: '72px', right: '0', zIndex: 10}}
          >
            <Menu
              menuItems={menuItems}
              setShowMenu={setOpenMenu}
              toggleRef={menuRef}
            />
          </div>
        )}
      </div>
    </S.Container>
  );
};

export default Topbar;
