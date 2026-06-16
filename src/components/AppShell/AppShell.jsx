import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Icon, ThemeToggle } from '../../ds';
import { AccountContext } from '../../contexts';
import { LOGO } from '../../constants/brand';
import * as S from './AppShell.style';

const NAV_ITEMS = [
  { path: '/home', label: 'Scan', icon: 'scan', match: ['/home', '/analysis'] },
  { path: '/plans', label: 'Plans', icon: 'star', match: ['/plans', '/pricing'] },
  { path: '/subscription', label: 'Subscription', icon: 'dollar', match: ['/subscription', '/payment/success'] },
  { path: '/settings', label: 'Settings', icon: 'cog', match: ['/settings'] },
];

const USER_MENU_ITEMS = [
  { text: 'Settings', icon: 'cog', path: '/settings' },
  { text: 'Plans', icon: 'star', path: '/plans' },
  { text: 'Subscription', icon: 'dollar', path: '/subscription' },
  { text: 'Logout', icon: 'logout', path: '/logout', separator: true, danger: true },
];

const isNavActive = (pathname, matchPaths) =>
  matchPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

const AppShell = ({ children }) => {
  const { account } = useContext(AccountContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const user = account?.user;
  const isPremium = user?.subscription_status === 'paid';

  const closeMenu = () => setOpenMenu(false);

  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!openMenu) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openMenu]);

  const getAvatarProps = () => {
    if (user?.avatar) return { type: 'image', value: user.avatar };
    if (user?.socialAvatar) return { type: 'image', value: user.socialAvatar };
    return { type: 'text', value: user?.email };
  };

  const avatarProps = getAvatarProps();
  const displayName = user?.name || user?.email?.split('@')[0] || 'Account';

  const handleMenuSelect = (path) => {
    closeMenu();
    navigate(path);
  };

  const renderUserMenu = (mobile = false) => (
    <S.UserMenu $mobile={mobile} onClick={(e) => e.stopPropagation()}>
      {USER_MENU_ITEMS.map((item) => (
        <S.UserMenuItem
          key={item.path}
          type="button"
          $danger={item.danger}
          $separator={item.separator}
          onClick={() => handleMenuSelect(item.path)}
        >
          <Icon
            name={item.icon}
            size={18}
            color={item.danger ? 'destructive.500' : 'text.secondary'}
            bg="inherit"
            weight={0}
          />
          {item.text}
        </S.UserMenuItem>
      ))}
    </S.UserMenu>
  );

  const renderNavLink = (item, Component) => {
    const active = isNavActive(location.pathname, item.match);
    return (
      <Component key={item.path} to={item.path} $active={active} onClick={closeMenu}>
        <Icon
          name={item.icon}
          size={Component === S.MobileNavLink ? 20 : 18}
          color={active ? 'primary' : 'text.secondary'}
          bg="inherit"
          weight={0}
        />
        {item.label}
      </Component>
    );
  };

  return (
    <S.Shell>
      {openMenu && (
        <S.MenuBackdrop
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <S.Layout>
        <S.Sidebar $menuOpen={openMenu}>
          <S.SidebarHeader>
            <S.BrandLink to="/home" onClick={closeMenu}>
              <img src={LOGO} alt="SkinXray" />
              <S.BrandText>SkinXray</S.BrandText>
            </S.BrandLink>
          </S.SidebarHeader>

          <S.SidebarNav onClick={closeMenu}>
            {NAV_ITEMS.map((item) => renderNavLink(item, S.SidebarLink))}
          </S.SidebarNav>

          <S.SidebarFooter>
            <S.FooterRow>
              <Badge $variant={isPremium ? 'premium' : 'free'}>
                {isPremium ? 'ACTIVE' : 'FREE'}
              </Badge>
              <div onClick={openMenu ? closeMenu : undefined}>
                <ThemeToggle />
              </div>
            </S.FooterRow>

            <S.UserRow onClick={() => setOpenMenu((prev) => !prev)}>
              <Avatar size={36} type={avatarProps.type} value={avatarProps.value} />
              <S.UserMeta>
                <S.UserName>{displayName}</S.UserName>
                <S.UserPlan>{isPremium ? 'Expert Care' : 'Free plan'}</S.UserPlan>
              </S.UserMeta>

              {openMenu && renderUserMenu()}
            </S.UserRow>
          </S.SidebarFooter>
        </S.Sidebar>

        <S.MainWrapper>
          <S.MobileHeader $menuOpen={openMenu}>
            <S.BrandLink to="/home" onClick={closeMenu}>
              <img src={LOGO} alt="SkinXray" />
            </S.BrandLink>
            <S.MobileHeaderRight>
              <Badge $variant={isPremium ? 'premium' : 'free'}>
                {isPremium ? 'ACTIVE' : 'FREE'}
              </Badge>
              <div onClick={openMenu ? closeMenu : undefined}>
                <ThemeToggle />
              </div>
              <S.MobileUserTrigger
                type="button"
                aria-label="Account menu"
                aria-expanded={openMenu}
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                <Avatar size={32} type={avatarProps.type} value={avatarProps.value} />
                {openMenu && renderUserMenu(true)}
              </S.MobileUserTrigger>
            </S.MobileHeaderRight>
          </S.MobileHeader>

          <S.Main>{children}</S.Main>
        </S.MainWrapper>
      </S.Layout>

      <S.MobileBottomNav>
        {NAV_ITEMS.map((item) => renderNavLink(item, S.MobileNavLink))}
      </S.MobileBottomNav>
    </S.Shell>
  );
};

export default AppShell;
