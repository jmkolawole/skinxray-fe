import styled, { keyframes } from 'styled-components';
import { colors, Text } from '../../ds';
import { Link } from 'react-router-dom';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Layout
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.shades[0]};
  overflow-x: hidden;
`;


// Navigation
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  background-color: ${colors.shades[0]};
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 1024px) {
    padding: 16px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(42, 179, 181, 0.3);
`;

export const LogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.neutral[800]};
  
  span {
    color: ${colors.primary[1000]};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.neutral[700]};
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: ${colors.primary[1000]};
  }
`;

export const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 14px rgba(42, 179, 181, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(42, 179, 181, 0.4);
    }
  ` : `
    background: transparent;
    color: ${colors.neutral[700]};
    border: none;
    
    &:hover {
      color: ${colors.primary[1000]};
    }
  `}
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  padding: 60px 100px 60px 220px;
  background: linear-gradient(180deg, #f0fdfa 0%, ${colors.shades[0]} 100%);
  min-height: 600px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 40px 40px 60px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    padding: 32px 20px 48px;
    min-height: auto;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 1024px) {
    max-width: 100%;
    margin-bottom: 48px;
  }
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${colors.shades[0]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.neutral[700]};
  margin-bottom: 32px;
  
  svg {
    color: ${colors.primary[1000]};
  }
`;

export const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  color: ${colors.neutral[900]};
  margin-bottom: 24px;
  
  span {
    background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 1024px) {
    font-size: 48px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: ${colors.neutral[600]};
  margin-bottom: 40px;
  max-width: 500px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 32px;
  }
`;

export const HeroCTA = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(42, 179, 181, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(42, 179, 181, 0.4);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    padding: 16px 28px;
    font-size: 16px;
  }
`;

export const HeroImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${float} 6s ease-in-out infinite;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const HeroImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  border-radius: 24px;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12);
  
  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

// Trust Indicators
export const TrustSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 40px 80px;
  background: linear-gradient(180deg, ${colors.shades[0]} 0%, #f9fafb 100%);
  border-top: 1px solid ${colors.neutral[100]};
  border-bottom: 1px solid ${colors.neutral[100]};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    padding: 32px 20px;
    align-items: center;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    color: ${colors.primary[1000]};
  }
`;

export const TrustText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.neutral[700]};
`;

// How It Works Section
export const HowItWorksSection = styled.section`
  padding: 100px 80px;
  background-color: #f9fafb;
  
  @media (max-width: 1024px) {
    padding: 80px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const SectionLabel = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${colors.primary[1000]};
  text-align: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 44px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  text-align: center;
  margin-bottom: 20px;
  
  span {
    background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 18px;
  color: ${colors.neutral[600]};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const StepCard = styled.div`
  background: ${colors.shades[0]};
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  }
`;

export const StepIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.1) 0%, rgba(79, 209, 197, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  
  svg {
    width: 36px;
    height: 36px;
    color: ${colors.primary[1000]};
  }
`;

export const StepTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 16px;
`;

export const StepDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${colors.neutral[600]};
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 100px 80px;
  background-color: ${colors.shades[0]};
  
  @media (max-width: 1024px) {
    padding: 80px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const FeatureCard = styled.div`
  padding: 32px;
  border-radius: 16px;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.shades[0]};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }
`;

export const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.15) 0%, rgba(79, 209, 197, 0.15) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    width: 28px;
    height: 28px;
    color: ${colors.primary[1000]};
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 12px;
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${colors.neutral[600]};
`;

// Reviews Section
export const ReviewsSection = styled.section`
  padding: 100px 80px;
  background-color: #f9fafb;
  
  @media (max-width: 1024px) {
    padding: 80px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const ReviewCard = styled.div`
  background: ${colors.shades[0]};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
`;

export const ReviewStars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  
  svg {
    width: 20px;
    height: 20px;
    color: #fbbf24;
    fill: #fbbf24;
  }
`;

export const ReviewText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${colors.neutral[700]};
  margin-bottom: 24px;
  font-style: italic;
`;

export const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ReviewAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

export const ReviewInfo = styled.div``;

export const ReviewName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.neutral[900]};
`;

export const ReviewRole = styled.div`
  font-size: 14px;
  color: ${colors.neutral[500]};
`;

// CTA Section
export const CTASection = styled.section`
  padding: 100px 80px;
  background: linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%);
  text-align: center;
  
  @media (max-width: 1024px) {
    padding: 80px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const CTATitle = styled.h2`
  font-size: 44px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 20px;
  
  span {
    background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const CTASubtitle = styled.p`
  font-size: 18px;
  color: ${colors.neutral[600]};
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(42, 179, 181, 0.3);
  margin-bottom: 24px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(42, 179, 181, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 16px;
  }
`;

export const CTAFeatures = styled.p`
  font-size: 14px;
  color: ${colors.neutral[500]};
`;

// Footer
export const Footer = styled.footer`
  padding: 80px 80px 40px;
  background-color: #1a1a2e;
  color: ${colors.shades[0]};
  
  @media (max-width: 1024px) {
    padding: 60px 40px 32px;
  }
  
  @media (max-width: 768px) {
    padding: 48px 20px 24px;
  }
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const FooterBrand = styled.div``;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const FooterLogoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

export const FooterLogoText = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.shades[0]};
  
  span {
    color: ${colors.primary[1000]};
  }
`;

export const FooterDescription = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${colors.neutral[400]};
  max-width: 300px;
`;

export const FooterColumn = styled.div``;

export const FooterColumnTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.shades[0]};
  margin-bottom: 20px;
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${colors.neutral[400]};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary[1000]};
  }
`;

export const FooterExternalLink = styled.a`
  font-size: 14px;
  color: ${colors.neutral[400]};
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: ${colors.primary[1000]};
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

export const FooterCopyright = styled.p`
  font-size: 14px;
  color: ${colors.neutral[500]};
`;

export const FooterSocial = styled.div`
  display: flex;
  gap: 16px;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.neutral[400]};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.primary[1000]};
    color: white;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Mobile Navigation Right Section
export const MobileNavRight = styled.div`
  display: none;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileSignInButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary[1000]};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: ${colors.primary[1100]};
  }
`;

// Mobile Menu
export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${colors.neutral[700]};
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenuContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${colors.shades[0]};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  padding: 80px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.3s ease;
  border-radius: 0 0 20px 20px;
`;

export const MobileMenuLink = styled.button`
  background: none;
  border: none;
  padding: 16px 20px;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.neutral[700]};
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.neutral[50]};
    color: ${colors.primary[1000]};
  }
  
  &:active {
    background: ${colors.neutral[100]};
  }
`;

// Scroll to Top Button
export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(42, 179, 181, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(42, 179, 181, 0.4);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// FAQ Wrapper
export const FAQWrapper = styled.div`
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  
  h3 {
    color: ${colors.shades[0]};
  }
`;

// Pricing Wrapper
export const PricingWrapper = styled.div`
  background-color: #f9fafb;
  
  section {
    background-color: transparent;
  }
`;

// Mobile App Section
export const MobileAppSection = styled.section`
  padding: 100px 80px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  text-align: center;
  
  @media (max-width: 1024px) {
    padding: 80px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const Rider = styled(Text)`
  margin-top: 16px;
`;

export const AppStoreButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`;

export const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  background: transparent;

  img {
    height: 50px;
    width: auto;
  }

  &:hover {
    opacity: ${props => props.disabled ? 0.6 : 0.85};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }

  @media (max-width: 768px) {
    width: auto;
    justify-content: center;
    
    img {
      height: 45px;
    }
  }
`;

// Disclaimer Section
export const DisclaimerSection = styled.section`
  display: flex;
  background-color: ${colors.shades[0]};
  border: 1px solid ${colors.neutral[200]};
  border-left: 4px solid #f97316;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 24px;
  margin: 0 80px 0;
  gap: 16px;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    margin: 0 40px 0;
  }
  
  @media (max-width: 768px) {
    margin: 0 20px 0;
    flex-direction: row;
    padding: 20px;
  }
`;

export const DisclaimerIcon = styled.div`
  color: #f97316;
  font-size: 24px;
  flex-shrink: 0;
`;

export const DisclaimerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
