import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Icon, Menu, ThemeToggle } from '../../ds';
import { AccountContext } from '../../contexts';
import { LOGO } from '../../constants/brand';
import * as S from './AppShell.style';

const NAV_ITEMS = [
  { path: '/home', label: 'Scan', icon: 'scan', match: ['/home', '/analysis'] },
  { path: '/plans', label: 'Plans', icon: 'star', match: ['/plans', '/pricing'] },
  { path: '/subscription', label: 'Subscription', icon: 'dollar', match: ['/subscription', '/payment/success'] },
  { path: '/settings', label: 'Settings', icon: 'cog', match: ['/settings'] },
];

const isNavActive = (pathname, matchPaths) =>
  matchPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

const AppShell = ({ children }) => {
  const { account } = useContext(AccountContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const user = account?.user;
  const isPremium = user?.subscription_status === 'paid';

  const getAvatarProps = () => {
    if (user?.avatar) return { type: 'image', value: user.avatar };
    if (user?.socialAvatar) return { type: 'image', value: user.socialAvatar };
    return { type: 'text', value: user?.email };
  };

  const avatarProps = getAvatarProps();
  const displayName = user?.name || user?.email?.split('@')[0] || 'Account';

  const menuItems = [
    { text: 'Settings', icon: 'cog', color: 'neutral.700', action: () => navigate('/settings') },
    { text: 'Plans', icon: 'star', color: 'neutral.700', action: () => navigate('/plans') },
    { text: 'Subscription', icon: 'dollar', color: 'neutral.700', action: () => navigate('/subscription') },
    { text: 'Logout', icon: 'logout', color: 'neutral.700', action: () => navigate('/logout') },
  ];

  const renderNavLink = (item, Component) => {
    const active = isNavActive(location.pathname, item.match);
    return (
      <Component key={item.path} to={item.path} $active={active}>
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
      <S.Layout>
        <S.Sidebar>
          <S.SidebarHeader>
            <S.BrandLink to="/home">
              <img src={LOGO} alt="SkinXray" />
              <S.BrandText>SkinXray</S.BrandText>
            </S.BrandLink>
          </S.SidebarHeader>

          <S.SidebarNav>
            {NAV_ITEMS.map((item) => renderNavLink(item, S.SidebarLink))}
          </S.SidebarNav>

          <S.SidebarFooter>
            <S.FooterRow>
              <Badge $variant={isPremium ? 'premium' : 'free'}>
                {isPremium ? 'ACTIVE' : 'FREE'}
              </Badge>
              <ThemeToggle />
            </S.FooterRow>

            <S.UserRow ref={menuRef} onClick={() => setOpenMenu(!openMenu)}>
              <Avatar size={36} type={avatarProps.type} value={avatarProps.value} />
              <S.UserMeta>
                <S.UserName>{displayName}</S.UserName>
                <S.UserPlan>{isPremium ? 'Expert Care' : 'Free plan'}</S.UserPlan>
              </S.UserMeta>
              {openMenu && (
                <div style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, zIndex: 10 }}>
                  <Menu menuItems={menuItems} setShowMenu={setOpenMenu} toggleRef={menuRef} />
                </div>
              )}
            </S.UserRow>
          </S.SidebarFooter>
        </S.Sidebar>

        <S.MainWrapper>
          <S.MobileHeader>
            <S.BrandLink to="/home">
              <img src={LOGO} alt="SkinXray" />
            </S.BrandLink>
            <S.MobileHeaderRight>
              <Badge $variant={isPremium ? 'premium' : 'free'}>
                {isPremium ? 'ACTIVE' : 'FREE'}
              </Badge>
              <ThemeToggle />
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
