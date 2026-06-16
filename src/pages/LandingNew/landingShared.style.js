import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow-x: hidden;
`;

/** Full-bleed horizontal padding matching the original landing layout */
export const landingHorizontalPadding = `
  padding-left: 220px;
  padding-right: 100px;

  @media (max-width: 1500px) {
    padding-left: 120px;
    padding-right: 80px;
  }

  @media (max-width: 1200px) {
    padding-left: 100px;
    padding-right: 80px;
  }

  @media (max-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: 980px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const SectionBlock = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  padding-bottom: 80px;
  ${landingHorizontalPadding}

  @media (max-width: 768px) {
    padding-top: 56px;
    padding-bottom: 56px;
  }
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px ${({ theme }) => theme.colors.shadow};
  }
`;

export const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 60px;
  padding-bottom: 60px;
  min-height: 600px;
  ${landingHorizontalPadding}
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background.hero[0]} 0%,
    ${({ theme }) => theme.colors.background.main} 100%
  );
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primaryLight};
    pointer-events: none;
  }

  &::before {
    width: 320px;
    height: 320px;
    top: -80px;
    right: 10%;
  }

  &::after {
    width: 200px;
    height: 200px;
    bottom: 20px;
    left: 5%;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    min-height: auto;
    padding-top: 40px;
    padding-bottom: 48px;
    text-align: center;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  animation: ${fadeInUp} 0.6s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 32px;
  max-width: 480px;

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export const HeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  max-width: 560px;
  max-height: 520px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 32px 64px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 980px) {
    max-height: 320px;
  }
`;

export const HeroImageFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
`;

export const HeroImageBadge = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.glassTab};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
`;

export const TrustSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 40px;
  padding-bottom: 0;
  ${landingHorizontalPadding}
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background.main};

  @media (max-width: 980px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 500;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DisclaimerBanner = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 36px;
  padding-bottom: 36px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  ${landingHorizontalPadding}

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export const CTASection = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  padding-bottom: 80px;
  ${landingHorizontalPadding}
  text-align: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.hero[0]} 0%,
    ${({ theme }) => theme.colors.background.hero[1]} 100%
  );
`;

export const CTATitle = styled.h2`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CTASubtitle = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 560px;
  margin: 0 auto 32px;
  line-height: 1.6;
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 90;
`;
