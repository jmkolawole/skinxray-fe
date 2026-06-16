import styled from 'styled-components';
import { Link } from 'react-router-dom';

const navPadding = `
  padding-left: 40px;
  padding-right: 40px;

  @media (max-width: 1200px) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (max-width: 980px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.background.main} 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme, $scrolled }) =>
    $scrolled ? `0 4px 20px ${theme.colors.shadow}` : 'none'};
  transition: box-shadow 0.25s ease;
`;

export const NavInner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 72px;
  box-sizing: border-box;
  ${navPadding}

  @media (max-width: 980px) {
    display: flex;
    justify-content: space-between;
    min-height: 64px;
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 40px;
    width: auto;
    display: block;
    object-fit: contain;
    border-radius: 10px;
  }
`;

export const LogoText = styled.span`
  display: none;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;

  @media (max-width: 1280px) {
    gap: 2px;
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  @media (max-width: 1280px) {
    font-size: 13px;
    padding: 8px 10px;
  }
`;

export const NavLinkCompact = styled(NavLink)`
  @media (max-width: 1180px) {
    display: none;
  }
`;

export const NavBlogLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 8px 12px;
  border-radius: 10px;
  white-space: nowrap;
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  @media (max-width: 1280px) {
    font-size: 13px;
    padding: 8px 10px;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 980px) {
    display: none;
  }
`;

export const NavDivider = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 4px;
  background: ${({ theme }) => theme.colors.border};
`;

export const NavCtaButton = styled.div`
  button {
    min-height: 40px;
    padding: 0 18px;
    border-radius: 14px;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
`;

export const MobileNavRight = styled.div`
  display: none;
  align-items: center;
  gap: 8px;

  @media (max-width: 980px) {
    display: flex;
  }
`;

export const MobileMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 200;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`;

export const MobileMenu = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(360px, 100vw);
  background: ${({ theme }) => theme.colors.surface};
  z-index: 201;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: -12px 0 40px ${({ theme }) => theme.colors.shadow};
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s ease;
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
`;

export const MobileMenuLink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 14px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MobileMenuActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
