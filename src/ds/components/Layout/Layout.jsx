import PropTypes from 'prop-types';
import { Card, Badge, PageSection, SectionHeader, SectionEyebrow, SectionTitle, SectionSubtitle, DisclaimerPill, DisclaimerBlock, DisclaimerTitle, DisclaimerText } from './Layout.style';

export { Card, Badge, PageSection, SectionHeader, SectionEyebrow, SectionTitle, SectionSubtitle, DisclaimerPill, DisclaimerBlock, DisclaimerTitle, DisclaimerText };

export const SectionHeaderBlock = ({ eyebrow, title, subtitle, accent, align = 'center' }) => (
  <SectionHeader $align={align}>
    {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
    <SectionTitle>
      {title}
      {accent && <> <span>{accent}</span></>}
    </SectionTitle>
    {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
  </SectionHeader>
);

SectionHeaderBlock.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  accent: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center']),
};
