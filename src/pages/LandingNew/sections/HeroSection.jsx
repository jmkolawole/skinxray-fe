import { BRAND } from '../../../constants/brand';
import { PrimaryButton } from '../../../ds';
import { SparklesIcon, ScanIcon } from '../landingIcons';
import heroImage from '../../../assets/images/hero2.png';
import * as S from '../landingShared.style';

const HeroSection = ({ onSignUp, onScrollTo }) => (
  <S.HeroSection id="hero">
    <S.HeroContent>
      <S.HeroBadge>
        <SparklesIcon />
        {BRAND.taglineEyebrow}
      </S.HeroBadge>
      <S.HeroTitle>
        {BRAND.tagline.split(',')[0]},<br />
        <span>{BRAND.tagline.split(',')[1]?.trim() || 'In Seconds'}</span>
      </S.HeroTitle>
      <S.HeroSubtitle>
        Upload a photo or describe symptoms for AI-powered skin insights — educational, fast, and private.
      </S.HeroSubtitle>
      <S.HeroActions>
        <PrimaryButton showArrow onClick={onSignUp}>Get Started</PrimaryButton>
        <PrimaryButton variant="outline" onClick={() => onScrollTo('how-it-works')}>
          See how it works
        </PrimaryButton>
      </S.HeroActions>
    </S.HeroContent>

    <S.HeroVisual>
      <S.HeroImageFrame>
        <S.HeroImage src={heroImage} alt="SkinXray analysis preview" />
        <S.HeroImageBadge>
          <ScanIcon size={18} />
          AI-powered insights in under 30 seconds
        </S.HeroImageBadge>
      </S.HeroImageFrame>
    </S.HeroVisual>
  </S.HeroSection>
);

export default HeroSection;
