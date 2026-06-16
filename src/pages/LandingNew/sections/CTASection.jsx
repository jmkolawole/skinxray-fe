import { PrimaryButton } from '../../../ds';
import * as S from '../landingShared.style';

const CTASection = ({ onSignUp }) => (
  <S.CTASection>
    <S.CTATitle>
      Ready to learn about your <span>skin?</span>
    </S.CTATitle>
    <S.CTASubtitle>
      Join users exploring AI-powered skin insights on web and mobile — free to start, upgrade when you need more.
    </S.CTASubtitle>
    <PrimaryButton showArrow onClick={onSignUp}>Get Started Free</PrimaryButton>
  </S.CTASection>
);

export default CTASection;
