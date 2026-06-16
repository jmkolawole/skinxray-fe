import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SIDEBAR_WIDTH = '240px';
export const MOBILE_NAV_HEIGHT = '72px';

export const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
`;

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ $menuOpen }) => ($menuOpen ? 50 : 40)};
  display: none;
  flex-direction: column;
  width: ${SIDEBAR_WIDTH};
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  overflow: visible;

  @media (min-width: 900px) {
    display: flex;
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px 20px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  img {
    height: 36px;
    width: auto;
    display: block;
    object-fit: contain;
    border-radius: 10px;
  }
`;

export const BrandText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.3px;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 12px;
  overflow-y: auto;
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text.secondary)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primaryLight : 'transparent')};
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const SidebarFooter = styled.div`
  position: relative;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: visible;
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  cursor: pointer;
  position: relative;
  padding: 6px 8px;
  margin: -6px -8px;
  border-radius: 12px;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;

  ${({ $mobile }) =>
    $mobile &&
    `
    top: calc(100% + 8px);
    bottom: auto;
    right: 0;
    left: auto;
    width: 220px;
    z-index: 52;
  `}
`;

export const MenuBackdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 45;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: default;
`;

export const UserMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $danger }) => ($danger ? theme.colors.error : theme.colors.text.primary)};
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme, $danger }) =>
      $danger ? theme.colors.errorLight : theme.colors.primaryLight};
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  ${({ $separator, theme }) =>
    $separator &&
    `
    border-top: 1px solid ${theme.colors.border};
  `}
`;

export const UserMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserPlan = styled.p`
  margin: 2px 0 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.light};
`;

export const MainWrapper = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 0;
  padding-bottom: ${MOBILE_NAV_HEIGHT};

  @media (min-width: 900px) {
    margin-left: ${SIDEBAR_WIDTH};
    padding-bottom: 0;
  }
`;

export const Main = styled.main`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 20px 48px;
  box-sizing: border-box;

  @media (min-width: 900px) {
    padding: 32px 32px 48px;
  }
`;

export const MobileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: ${({ $menuOpen }) => ($menuOpen ? 50 : 30)};

  @media (min-width: 900px) {
    display: none;
  }
`;

export const MobileHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MobileUserTrigger = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
`;

export const MobileBottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: stretch;
  height: ${MOBILE_NAV_HEIGHT};
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: env(safe-area-inset-bottom, 0);

  @media (min-width: 900px) {
    display: none;
  }
`;

export const MobileNavLink = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text.light)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primaryLight : 'transparent')};
  transition: background 0.2s, color 0.2s;
`;
