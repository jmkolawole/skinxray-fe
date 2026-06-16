import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, DisclaimerBlock, DisclaimerTitle, DisclaimerText } from '../../ds';
import { useTheme } from '../../contexts/ThemeContext';
import { SECTION_COLORS } from '../../ds/utils/theme';
import { getRiskStyle } from '../../utils/riskLevel';
import { DISCLAIMERS } from '../../constants/disclaimers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ToggleAll = styled.button`
  background: none;
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0;
`;

const RiskBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
`;

const RiskLabel = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${({ $color }) => $color};
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active, $color, theme }) =>
    $active ? $color : theme.colors.background.tertiary};
  border: 1px solid ${({ $active, $color, theme }) =>
    $active ? $color : theme.colors.border};
`;

const SectionCard = styled.div`
  background: ${({ $bg, theme }) => $bg || theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ $border }) => $border};
  border-radius: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
`;

const SectionTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SectionBody = styled.div`
  padding: 0 20px 16px;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 280px;
  border-radius: 12px;
  display: block;
  margin: 0 auto 12px;
`;

const getSectionColors = (key, themeMode) => SECTION_COLORS[themeMode]?.[key] || SECTION_COLORS.light[key];

const AnalysisResult = ({ details, imagePath, showHeader = true }) => {
  const { theme } = useTheme();
  const themeMode = theme === 'dark' ? 'dark' : 'light';
  const risk = getRiskStyle(details?.severity);

  const [collapsed, setCollapsed] = useState({
    image: false,
    symptoms: false,
    assessment: false,
    recommendations: false,
    severity: false,
  });

  const allCollapsed = Object.values(collapsed).every(Boolean);

  const toggle = (key) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleAll = () => {
    const next = !allCollapsed;
    setCollapsed({
      image: next,
      symptoms: next,
      assessment: next,
      recommendations: next,
      severity: next,
    });
  };

  const severityNum = parseInt(details?.severity, 10) || 0;

  return (
    <Container>
      {showHeader && (
        <Header className="no-print">
          <Title>Analysis Results</Title>
          <ToggleAll type="button" onClick={toggleAll}>
            {allCollapsed ? 'Expand All' : 'Collapse All'}
          </ToggleAll>
        </Header>
      )}

      {details?.severity && risk && (
        <RiskBanner $bg={risk.bg} $border={risk.border}>
          <RiskLabel $color={risk.color}>{risk.label}</RiskLabel>
          <Dots>
            {[1, 2, 3, 4, 5].map((n) => (
              <Dot key={n} $active={n <= severityNum} $color={risk.color} />
            ))}
          </Dots>
        </RiskBanner>
      )}

      {imagePath && (
        <SectionCard
          $bg={getSectionColors('image', themeMode).bg}
          $border={getSectionColors('image', themeMode).border}
        >
          <SectionHeader type="button" onClick={() => toggle('image')}>
            <SectionTitle>Uploaded Image</SectionTitle>
            <Icon name={collapsed.image ? 'chevronDown' : 'chevronUp'} size={18} color="text.secondary" bg="inherit" weight={0} />
          </SectionHeader>
          <SectionBody $open={!collapsed.image}>
            <ImagePreview src={imagePath} alt="Uploaded skin" className="diagnosis-image" />
          </SectionBody>
        </SectionCard>
      )}

      {details?.symptomsDescription && (
        <SectionCard
          $bg={getSectionColors('lightBlue', themeMode).bg}
          $border={getSectionColors('lightBlue', themeMode).border}
        >
          <SectionHeader type="button" onClick={() => toggle('symptoms')}>
            <SectionTitle>Symptoms</SectionTitle>
            <Icon name={collapsed.symptoms ? 'chevronDown' : 'chevronUp'} size={18} color="text.secondary" bg="inherit" weight={0} />
          </SectionHeader>
          <SectionBody $open={!collapsed.symptoms}>{details.symptomsDescription}</SectionBody>
        </SectionCard>
      )}

      {details?.assessment && (
        <SectionCard
          $bg={getSectionColors('blue', themeMode).bg}
          $border={getSectionColors('blue', themeMode).border}
        >
          <SectionHeader type="button" onClick={() => toggle('assessment')}>
            <SectionTitle>Assessment</SectionTitle>
            <Icon name={collapsed.assessment ? 'chevronDown' : 'chevronUp'} size={18} color="text.secondary" bg="inherit" weight={0} />
          </SectionHeader>
          <SectionBody $open={!collapsed.assessment}>{details.assessment}</SectionBody>
        </SectionCard>
      )}

      {details?.recommendations && (
        <SectionCard
          $bg={getSectionColors('purple', themeMode).bg}
          $border={getSectionColors('purple', themeMode).border}
        >
          <SectionHeader type="button" onClick={() => toggle('recommendations')}>
            <SectionTitle>Recommendations</SectionTitle>
            <Icon name={collapsed.recommendations ? 'chevronDown' : 'chevronUp'} size={18} color="text.secondary" bg="inherit" weight={0} />
          </SectionHeader>
          <SectionBody $open={!collapsed.recommendations}>{details.recommendations}</SectionBody>
        </SectionCard>
      )}

      <DisclaimerBlock className="medical-disclaimer-print">
        <Icon bg="inherit" color="warning.500" name="warning" size={20} weight={0} />
        <div>
          <DisclaimerTitle>{DISCLAIMERS.importantNoticeTitle}</DisclaimerTitle>
          <DisclaimerText>{DISCLAIMERS.results}</DisclaimerText>
        </div>
      </DisclaimerBlock>
    </Container>
  );
};

AnalysisResult.propTypes = {
  details: PropTypes.shape({
    symptomsDescription: PropTypes.string,
    assessment: PropTypes.string,
    recommendations: PropTypes.string,
    severity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  imagePath: PropTypes.string,
  showHeader: PropTypes.bool,
};

export default AnalysisResult;
