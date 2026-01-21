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
  background-color: ${colors.shades[0]};
  overflow-x: hidden;
  font-family: 'Outfit', sans-serif;
  
  * {
    font-family: 'Outfit', sans-serif;
  }
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
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 980px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const LogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.neutral[800]};
  
  span {
    color: ${colors.primary[1000]};
  }
  
  @media (max-width: 980px) {
    font-size: 20px;
  }
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

// Back Link
export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${colors.neutral[600]};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  margin-bottom: 24px;
  
  &:hover {
    color: ${colors.primary[1000]};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// Article Container
export const ArticleContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px 100px;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 980px) {
    padding: 40px 20px 80px;
  }
`;

// Article Header
export const ArticleHeader = styled.header`
  margin-bottom: 48px;
  text-align: center;
`;

export const ArticleCategory = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background: rgba(42, 179, 181, 0.1);
  color: ${colors.primary[1000]};
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 50px;
  margin-bottom: 20px;
`;

export const ArticleTitle = styled.h1`
  font-size: 44px;
  font-weight: 800;
  line-height: 1.2;
  color: ${colors.neutral[900]};
  margin-bottom: 24px;
  
  @media (max-width: 980px) {
    font-size: 32px;
  }
  
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  color: ${colors.neutral[500]};
  font-size: 14px;
  
  @media (max-width: 600px) {
    gap: 16px;
  }
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

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AuthorAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

export const AuthorName = styled.span`
  font-weight: 600;
  color: ${colors.neutral[700]};
`;

// Featured Image
export const FeaturedImage = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 48px;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.1) 0%, rgba(79, 209, 197, 0.1) 100%);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 980px) {
    height: 300px;
    border-radius: 16px;
  }
  
  @media (max-width: 600px) {
    height: 220px;
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(42, 179, 181, 0.15) 0%, rgba(79, 209, 197, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary[1000]};
  
  svg {
    width: 64px;
    height: 64px;
    opacity: 0.5;
  }
`;

// Article Content
export const ArticleContent = styled.div`
  font-size: 18px;
  line-height: 1.8;
  color: ${colors.neutral[700]};
  
  h2 {
    font-size: 28px;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin: 48px 0 20px;
    line-height: 1.3;
    
    @media (max-width: 980px) {
      font-size: 24px;
    }
  }
  
  h3 {
    font-size: 22px;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin: 36px 0 16px;
    line-height: 1.4;
    
    @media (max-width: 980px) {
      font-size: 20px;
    }
  }
  
  p {
    margin-bottom: 24px;
  }
  
  ul, ol {
    margin-bottom: 24px;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 12px;
  }
  
  blockquote {
    border-left: 4px solid ${colors.primary[1000]};
    padding-left: 24px;
    margin: 32px 0;
    font-style: italic;
    color: ${colors.neutral[600]};
  }
  
  a {
    color: ${colors.primary[1000]};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
    
    &:hover {
      border-bottom-color: ${colors.primary[1000]};
    }
  }
  
  img {
    width: 100%;
    border-radius: 12px;
    margin: 32px 0;
  }
  
  code {
    background: ${colors.neutral[100]};
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
  
  pre {
    background: ${colors.neutral[900]};
    color: ${colors.neutral[100]};
    padding: 24px;
    border-radius: 12px;
    overflow-x: auto;
    margin: 32px 0;
    
    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }
  
  @media (max-width: 980px) {
    font-size: 16px;
  }
`;

// Tags
export const TagsSection = styled.div`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid ${colors.neutral[200]};
`;

export const TagsLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.neutral[600]};
  margin-right: 12px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: ${colors.neutral[100]};
  color: ${colors.neutral[700]};
  font-size: 13px;
  font-weight: 500;
  border-radius: 50px;
  margin: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(42, 179, 181, 0.1);
    color: ${colors.primary[1000]};
  }
`;

// Share Section
export const ShareSection = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ShareLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.neutral[600]};
`;

export const ShareButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ShareButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${colors.neutral[200]};
  background: ${colors.shades[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.neutral[600]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.primary[1000]};
    border-color: ${colors.primary[1000]};
    color: white;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// Related Posts
export const RelatedSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 100px;
  
  @media (max-width: 980px) {
    padding: 60px 20px 80px;
  }
`;

export const RelatedTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 32px;
  text-align: center;
  
  @media (max-width: 980px) {
    font-size: 24px;
  }
`;

export const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const RelatedCard = styled(Link)`
  background: ${colors.shades[0]};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

export const RelatedImage = styled.div`
  width: 100%;
  height: 180px;
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

export const RelatedContent = styled.div`
  padding: 20px;
`;

export const RelatedCategory = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: rgba(42, 179, 181, 0.1);
  color: ${colors.primary[1000]};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

export const RelatedPostTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  line-height: 1.4;
  margin-bottom: 8px;
`;

export const RelatedMeta = styled.span`
  font-size: 13px;
  color: ${colors.neutral[500]};
`;

// CTA Section
export const CTASection = styled.section`
  padding: 80px 24px;
  background: linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%);
  text-align: center;
  
  @media (max-width: 980px) {
    padding: 60px 20px;
  }
`;

export const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 16px;
  
  span {
    background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 980px) {
    font-size: 28px;
  }
`;

export const CTASubtitle = styled.p`
  font-size: 18px;
  color: ${colors.neutral[600]};
  max-width: 500px;
  margin: 0 auto 32px;
  line-height: 1.6;
  
  @media (max-width: 980px) {
    font-size: 16px;
  }
`;

export const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, ${colors.primary[1000]} 0%, #4fd1c5 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
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
`;

// Footer
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

// Loading State
export const LoadingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px 100px;
`;

export const SkeletonText = styled.div`
  height: ${props => props.$height || '16px'};
  width: ${props => props.$width || '100%'};
  background: linear-gradient(90deg, ${colors.neutral[100]} 25%, ${colors.neutral[50]} 50%, ${colors.neutral[100]} 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: ${props => props.$mb || '0'};
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 450px;
  background: linear-gradient(90deg, ${colors.neutral[100]} 25%, ${colors.neutral[50]} 50%, ${colors.neutral[100]} 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 20px;
  margin-bottom: 48px;
  
  @media (max-width: 980px) {
    height: 300px;
  }
`;
