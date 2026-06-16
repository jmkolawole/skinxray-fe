import { Link } from 'react-router-dom';
import { DISCLAIMERS } from '../../../constants/disclaimers';
import * as S from '../landingShared.style';

const EarlyDisclaimer = () => (
  <S.DisclaimerBanner>
    {DISCLAIMERS.landing}{' '}
    <Link to="/medical-disclaimer">Learn more</Link>
  </S.DisclaimerBanner>
);

export default EarlyDisclaimer;
