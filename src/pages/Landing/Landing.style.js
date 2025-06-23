import styled from 'styled-components';
import { colors, Text } from '../../ds';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.shades[100]};
`;

export const HeroSection = styled.section`
  display: flex;
  padding: 80px 120px;
  background: linear-gradient(135deg, ${colors.shades[0]} 0%, ${colors.shades[200]} 100%);
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 60px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`;

export const Logo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${colors.primary[1000]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-right: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Tagline = styled.div`
  margin-bottom: 24px;
`;

export const Subtitle = styled.div`
  margin-bottom: 40px;
  max-width: 90%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeroImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 500px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const FeaturesSection = styled.section`
  padding: 80px 120px;
  background-color: ${colors.shades[0]};
  
  @media (max-width: 1024px) {
    padding: 60px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const FeatureCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 48px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background-color: ${colors.shades[0]};
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${colors.primary[50]};
  color: ${colors.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

export const DisclaimerSection = styled.section`
  display: flex;
  background-color: ${colors.shades[0]};
  border: 1px solid #e5e7eb;
  border-left: 4px solid #f97316;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 24px;
  margin: 0 120px 80px;
  gap: 16px;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    margin: 0 40px 60px;
  }
  
  @media (max-width: 768px) {
    margin: 0 20px 40px;
    flex-direction: column;
  }
`;

export const DisclaimerIcon = styled.div`
  color: #f97316;
  font-size: 24px;
  margin-top: 2px;
  
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const DisclaimerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Footer = styled.footer`
  background-color: ${colors.shades[0]};
  padding: 24px 0;
  text-align: center;
  border-top: 1px solid ${colors.neutral[200]};
  margin-top: auto;
`;

export const FooterLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const MobileAppSection = styled.div`
  margin: 64px 0;
  text-align: center;
`;

export const AppStoreButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
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
    height: 40px;
    width: auto;
  }

  &:hover {
    opacity: ${props => props.disabled ? 0.6 : 0.85};
  }

  @media (max-width: 768px) {
    width: auto;
    justify-content: center;
  }
`;

export const StoreButtonText = styled.div`
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Rider = styled(Text)`
  margin-top: 16px;
`;