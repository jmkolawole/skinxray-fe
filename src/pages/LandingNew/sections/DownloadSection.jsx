import styled from 'styled-components';
import googlePlayBadge from '../../../assets/images/google-play-badge.svg';
import appStoreBadge from '../../../assets/images/app-store-badge.svg';
import { landingHorizontalPadding } from '../landingShared.style';

const Section = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding-top: 64px;
  padding-bottom: 64px;
  ${landingHorizontalPadding}
  text-align: center;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 32px;
`;

const StoreButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const StoreLink = styled.a`
  display: block;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }

  img {
    height: 52px;
    width: auto;
  }
`;

const ComingSoon = styled.span`
  display: block;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.light};
  margin-top: 6px;
`;

const DownloadSection = () => (
  <Section id="download">
    <Title>Get SkinXray on mobile</Title>
    <Subtitle>Scan on the go with our iOS and Android apps</Subtitle>
    <StoreButtons>
      <div>
        <StoreLink
          href="https://play.google.com/store/apps/details?id=com.skinxrayapp.mobile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={googlePlayBadge} alt="Get it on Google Play" />
        </StoreLink>
      </div>
      <div>
        <StoreLink
          href="https://apps.apple.com/app/skinxray/id6738290000"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={appStoreBadge} alt="Download on the App Store" />
        </StoreLink>
        <ComingSoon>Also available on TestFlight</ComingSoon>
      </div>
    </StoreButtons>
  </Section>
);

export default DownloadSection;
