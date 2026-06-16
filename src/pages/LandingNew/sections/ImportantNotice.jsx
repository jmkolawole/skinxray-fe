import styled from 'styled-components';
import { Icon, DisclaimerBlock, DisclaimerTitle, DisclaimerText } from '../../../ds';
import { DISCLAIMERS } from '../../../constants/disclaimers';
import { landingHorizontalPadding } from '../landingShared.style';

const Section = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding-top: 32px;
  padding-bottom: 48px;
  ${landingHorizontalPadding}
`;

const ImportantNotice = () => (
  <Section id="disclaimer">
    <DisclaimerBlock>
      <Icon bg="inherit" color="warning.500" name="warning" size={20} weight={0} />
      <div>
        <DisclaimerTitle>{DISCLAIMERS.importantNoticeTitle}</DisclaimerTitle>
        <DisclaimerText>{DISCLAIMERS.results}</DisclaimerText>
      </div>
    </DisclaimerBlock>
  </Section>
);

export default ImportantNotice;
