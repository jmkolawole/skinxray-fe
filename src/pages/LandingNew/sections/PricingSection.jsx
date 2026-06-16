import styled from 'styled-components';
import Pricing from '../../../components/Pricing/Pricing';
import { SectionBlock } from '../landingShared.style';

const PricingSection = ({ onSignUp }) => (
  <SectionBlock id="pricing" as="div" style={{ paddingTop: 0 }}>
    <Pricing onSignUp={onSignUp} />
  </SectionBlock>
);

export default PricingSection;
