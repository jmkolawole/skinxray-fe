import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LOGO } from '../../../constants/brand';
import { landingHorizontalPadding } from '../landingShared.style';

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  box-sizing: border-box;
  padding-top: 64px;
  padding-bottom: 32px;
  ${landingHorizontalPadding}
`;

const FooterInner = styled.div`
  width: 100%;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div``;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  img {
    height: 44px;
    width: auto;
    display: block;
    object-fit: contain;
    border-radius: 10px;
  }
`;

const FooterLogoText = styled.span`
  display: none;
`;

const FooterDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 280px;
`;

const FooterColumnTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: 16px;
`;

const Copyright = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.light};
  margin: 0;
`;

const FooterSection = ({ onScrollTo }) => (
  <Footer>
    <FooterInner>
      <FooterTop>
        <FooterBrand>
          <FooterLogo>
            <img src={LOGO} alt="SkinXray" />
          </FooterLogo>
          <FooterDescription>
            AI-powered skin insights for educational purposes. Learn about your skin in seconds.
          </FooterDescription>
        </FooterBrand>

        <div>
          <FooterColumnTitle>Product</FooterColumnTitle>
          <FooterLinks>
            <li><FooterButton type="button" onClick={() => onScrollTo('features')}>Features</FooterButton></li>
            <li><FooterButton type="button" onClick={() => onScrollTo('how-it-works')}>How It Works</FooterButton></li>
            <li><FooterButton type="button" onClick={() => onScrollTo('pricing')}>Pricing</FooterButton></li>
            <li><FooterButton type="button" onClick={() => onScrollTo('faq')}>FAQ</FooterButton></li>
          </FooterLinks>
        </div>

        <div>
          <FooterColumnTitle>Company</FooterColumnTitle>
          <FooterLinks>
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/blog">Blog</FooterLink></li>
            <li><FooterLink to="mailto:skinxray@gmail.com">Contact</FooterLink></li>
          </FooterLinks>
        </div>

        <div>
          <FooterColumnTitle>Legal</FooterColumnTitle>
          <FooterLinks>
            <li><FooterLink to="/privacy-policy">Privacy Policy</FooterLink></li>
            <li><FooterLink to="/terms-of-service">Terms of Service</FooterLink></li>
            <li><FooterLink to="/medical-disclaimer">Important Notice</FooterLink></li>
          </FooterLinks>
        </div>
      </FooterTop>

      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} SkinXray. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterInner>
  </Footer>
);

export default FooterSection;
