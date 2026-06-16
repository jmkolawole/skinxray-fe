import { ShieldIcon, CheckCircleIcon, ZapIcon } from '../landingIcons';
import * as S from '../landingShared.style';

const TrustBar = () => (
  <S.TrustSection>
    <S.TrustItem>
      <ShieldIcon />
      Privacy-first design
    </S.TrustItem>
    <S.TrustItem>
      <ZapIcon />
      Results in under 30 seconds
    </S.TrustItem>
    <S.TrustItem>
      <CheckCircleIcon />
      Educational AI insights
    </S.TrustItem>
  </S.TrustSection>
);

export default TrustBar;
