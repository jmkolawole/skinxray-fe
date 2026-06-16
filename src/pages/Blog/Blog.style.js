import styled, { keyframes } from 'styled-components';
import { colors } from '../../ds';
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

// Layout
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow-x: hidden;
`;

// Navigation (reused from LandingNew)
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  background-color: ${colors.shades[0]};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${colors.neutral[100]};
  
  @media (max-width: 1200px) {
    padding: 16px 40px;
  }
  
  @media (max-width: 980px) {
    padding: 16px 20px;
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
`;

export const LogoIcon = styled.div`
  img {
    height: 44px;
    width: auto;
    display: block;
    object-fit: contain;
  }

  @media (max-width: 980px) {
    img {
      height: 38px;
    }
  }
`;

export const LogoText = styled.span`
  display: none;
`;

export const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 980px) {
    gap: 8px;
  }
`;

export const NavButton = styled(Link)`
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-decoration: none;
  
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
  
  @media (max-width: 980px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  padding: 80px 80px 60px;
  background: linear-gradient(180deg, #f0fdfa 0%, ${colors.shades[0]} 100%);
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 1024px) {
    padding: 60px 40px 48px;
  }
  
  @media (max-width: 980px) {
    padding: 48px 20px 40px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
  color: ${colors.neutral[900]};
  margin-bottom: 20px;
  
  span {
    background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 980px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: ${colors.neutral[600]};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 980px) {
    font-size: 16px;
  }
`;

// Blog Content Section
export const BlogSection = styled.section`
  padding: 60px 80px 100px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 48px 40px 80px;
  }
  
  @media (max-width: 980px) {
    padding: 32px 20px 60px;
  }
`;

// Featured Post
export const FeaturedPost = styled(Link)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  background: ${colors.shades[0]};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  margin-bottom: 60px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
  
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.1) 0%, rgba(79, 209, 197, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 980px) {
    height: 240px;
  }
`;

export const FeaturedContent = styled.div`
  padding: 48px 48px 48px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 980px) {
    padding: 32px;
  }
`;

export const FeaturedBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 50px;
  margin-bottom: 20px;
  width: fit-content;
`;

export const FeaturedTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 16px;
  line-height: 1.3;
  
  @media (max-width: 980px) {
    font-size: 24px;
  }
`;

export const FeaturedExcerpt = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${colors.neutral[600]};
  margin-bottom: 24px;
`;

export const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${colors.neutral[500]};
  font-size: 14px;
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// Blog Grid
export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 32px;
  
  @media (max-width: 980px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const BlogCard = styled(Link)`
  background: ${colors.shades[0]};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.08) 0%, rgba(79, 209, 197, 0.08) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 24px;
`;

export const CardCategory = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(42, 179, 181, 0.1);
  color: ${colors.primary[1000]};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 50px;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 12px;
  line-height: 1.4;
  
  @media (max-width: 980px) {
    font-size: 18px;
  }
`;

export const CardExcerpt = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.neutral[600]};
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.neutral[500]};
  font-size: 13px;
`;

export const CardAuthor = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AuthorAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

// Placeholder for images
export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.15) 0%, rgba(79, 209, 197, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary[1000]};
  
  svg {
    width: 48px;
    height: 48px;
    opacity: 0.5;
  }
`;

// Loading State
export const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonCard = styled.div`
  background: ${colors.shades[0]};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, ${colors.neutral[100]} 25%, ${colors.neutral[50]} 50%, ${colors.neutral[100]} 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const SkeletonContent = styled.div`
  padding: 24px;
`;

export const SkeletonText = styled.div`
  height: ${props => props.$height || '16px'};
  width: ${props => props.$width || '100%'};
  background: linear-gradient(90deg, ${colors.neutral[100]} 25%, ${colors.neutral[50]} 50%, ${colors.neutral[100]} 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: ${props => props.$mb || '0'};
`;

// Footer (simplified version)
export const Footer = styled.footer`
  padding: 40px 80px;
  background-color: #1a1a2e;
  text-align: center;
  
  @media (max-width: 980px) {
    padding: 32px 20px;
  }
`;

export const FooterText = styled.p`
  font-size: 14px;
  color: ${colors.neutral[500]};
`;

export const FooterLink = styled(Link)`
  color: ${colors.primary[1000]};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;
