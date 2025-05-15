import {useContext, useRef, useState} from 'react';
import * as S from './Topbar.style';
import {useNavigate} from 'react-router-dom';
import {Avatar, Icon, Menu} from '../../ds';
import {AccountContext} from '../../contexts';

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

  const handlePricing = () => {
    navigate('/pricing');
  };

  const menuItems = [
    {
      text: 'Settings',
      icon: 'cog',
      color: 'neutral.700',
      action: handleSettings,
    },
    {
      text: 'Subscription',
      icon: 'dollar',
      color: 'neutral.700',
      action: handlePricing,
    },
    {
      text: 'Logout',
      icon: 'logout',
      color: 'neutral.700',
      action: handleLogout,
    },
  ];

  // Determine avatar type and value
  const getAvatarProps = () => {
    const user = account.user;

    // If user has a local avatar
    if (user?.avatar) {
        return {
          type: 'image',
          value: user.avatar
        };
      }
    
    // If user has a social avatar (e.g., from Google)
    if (user?.socialAvatar) {
      return {
        type: 'image',
        value: user.socialAvatar
      };
    }
    
    // Fallback to text avatar using email
    return {
      type: 'text',
      value: user?.email
    };
  };

  const avatarProps = getAvatarProps();

  return (
    <S.Container>
      <div style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
        <Icon name={'home'} color="primary.1000" />
      </div>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        ref={menuRef}
        style={{cursor: 'pointer'}}
      >
        <Avatar
          size={48}
          type={avatarProps.type}
          value={avatarProps.value}
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
