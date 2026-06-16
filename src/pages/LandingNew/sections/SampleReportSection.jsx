import styled from 'styled-components';
import { SectionHeaderBlock } from '../../../ds';
import { RISK_STYLES, getSectionColors } from '../../../ds/utils/theme';
import { useTheme } from '../../../contexts/ThemeContext';
import { SectionBlock } from '../landingShared.style';
import heroSecondary from '../../../assets/images/hero.jpg';

const SampleLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-top: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ReportColumn = styled.div`
  width: 100%;
`;

const ImageColumn = styled.div`
  width: 100%;
`;

const ShowcaseImage = styled.img`
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 48px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Wrapper = styled.div`
  width: 100%;
`;

const RiskBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  background: ${RISK_STYLES.moderate.bg};
  border: 1px solid ${RISK_STYLES.moderate.border};
  margin-bottom: 16px;
`;

const RiskLabel = styled.span`
  font-weight: 700;
  color: ${RISK_STYLES.moderate.color};
  font-size: 15px;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? RISK_STYLES.moderate.color : theme.colors.background.tertiary};
`;

const Section = styled.div`
  background: ${({ $bg, theme }) => $bg || theme.colors.card};
  border-left: 4px solid ${({ $border }) => $border};
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left-width: 4px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SectionBody = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SampleReportSection = () => {
  const { theme } = useTheme();
  const sectionColors = getSectionColors(theme);

  return (
    <SectionBlock id="sample-report">
      <SectionHeaderBlock
        eyebrow="Sample Report"
        title="See what you'll"
        accent="get"
        subtitle="A preview of the educational insights SkinXray provides after each scan."
      />
      <SampleLayout>
        <ReportColumn>
          <Wrapper>
            <RiskBanner>
              <RiskLabel>Moderate</RiskLabel>
              <Dots>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Dot key={n} $active={n <= 3} />
                ))}
              </Dots>
            </RiskBanner>

            <Section $bg={sectionColors.lightBlue.bg} $border={sectionColors.lightBlue.border}>
              <SectionTitle>Symptoms</SectionTitle>
              <SectionBody>
                Mild redness and itching on the forearm, present for about 3 days. No swelling or blistering noted.
              </SectionBody>
            </Section>

            <Section $bg={sectionColors.blue.bg} $border={sectionColors.blue.border}>
              <SectionTitle>Assessment</SectionTitle>
              <SectionBody>
                Patterns may be consistent with mild contact irritation or eczema-like changes. This is an AI-generated
                observation for learning purposes only.
              </SectionBody>
            </Section>

            <Section $bg={sectionColors.purple.bg} $border={sectionColors.purple.border}>
              <SectionTitle>Recommendations</SectionTitle>
              <SectionBody>
                Monitor the area, avoid known irritants, and consider follow-up if you have ongoing concerns.
              </SectionBody>
            </Section>
          </Wrapper>
        </ReportColumn>

        <ImageColumn>
          <ShowcaseImage src={heroSecondary} alt="Skin analysis example" />
        </ImageColumn>
      </SampleLayout>
    </SectionBlock>
  );
};

export default SampleReportSection;
