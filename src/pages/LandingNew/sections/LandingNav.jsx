import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton, ThemeToggle } from '../../../ds';
import { LOGO } from '../../../constants/brand';
import { CloseIcon, HamburgerIcon } from '../landingIcons';
import * as S from './LandingNav.style';

const NAV_ITEMS = [
  { id: 'how-it-works', label: 'How it Works' },
  { id: 'features', label: 'Features' },
  { id: 'sample-report', label: 'Sample Report', compact: true },
  { id: 'reviews', label: 'Reviews' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'download', label: 'Download', compact: true },
];

const LandingNav = ({ onScrollTo, onSignUp, onLogin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNav = (id) => {
    onScrollTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <S.Nav $scrolled={scrolled}>
        <S.NavInner>
          <S.NavLogo to="/">
            <img src={LOGO} alt="SkinXray" />
          </S.NavLogo>

          <S.NavLinks aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const LinkComponent = item.compact ? S.NavLinkCompact : S.NavLink;
              return (
                <LinkComponent key={item.id} type="button" onClick={() => handleNav(item.id)}>
                  {item.label}
                </LinkComponent>
              );
            })}
            <S.NavBlogLink to="/blog">Blog</S.NavBlogLink>
          </S.NavLinks>

          <S.NavActions>
            <ThemeToggle />
            <S.NavDivider aria-hidden="true" />
            <PrimaryButton variant="outline" size="sm" onClick={onLogin}>
              Sign In
            </PrimaryButton>
            <S.NavCtaButton>
              <PrimaryButton size="sm" onClick={onSignUp}>
                Get Started
              </PrimaryButton>
            </S.NavCtaButton>
          </S.NavActions>

          <S.MobileNavRight>
            <ThemeToggle />
            <S.MobileMenuButton type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <HamburgerIcon />
            </S.MobileMenuButton>
          </S.MobileNavRight>
        </S.NavInner>
      </S.Nav>

      <S.MobileOverlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <S.MobileMenu $open={menuOpen} aria-hidden={!menuOpen}>
        <S.MobileMenuHeader>
          <S.NavLogo to="/" onClick={() => setMenuOpen(false)}>
            <img src={LOGO} alt="SkinXray" />
          </S.NavLogo>
          <S.MobileMenuButton type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </S.MobileMenuButton>
        </S.MobileMenuHeader>

        <S.MobileMenuLinks>
          {NAV_ITEMS.map((item) => (
            <S.MobileMenuLink key={item.id} type="button" onClick={() => handleNav(item.id)}>
              {item.label}
            </S.MobileMenuLink>
          ))}
          <S.MobileMenuLink
            type="button"
            onClick={() => {
              navigate('/blog');
              setMenuOpen(false);
            }}
          >
            Blog
          </S.MobileMenuLink>
        </S.MobileMenuLinks>

        <S.MobileMenuActions>
          <PrimaryButton variant="outline" fullWidth onClick={() => { onLogin(); setMenuOpen(false); }}>
            Sign In
          </PrimaryButton>
          <PrimaryButton fullWidth onClick={() => { onSignUp(); setMenuOpen(false); }}>
            Get Started
          </PrimaryButton>
        </S.MobileMenuActions>
      </S.MobileMenu>
    </>
  );
};

export default LandingNav;
