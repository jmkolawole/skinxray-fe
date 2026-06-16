import { SectionHeaderBlock } from '../../../ds';
import { UploadIcon, ScanIcon, FileTextIcon } from '../landingIcons';
import * as S from '../landingShared.style';

const STEPS = [
  {
    icon: <UploadIcon />,
    title: 'Upload or Describe',
    description: 'Take a clear photo or describe what you notice. We support common image formats and free-text symptoms.',
  },
  {
    icon: <ScanIcon />,
    title: 'AI Analysis',
    description: 'Our AI reviews your input and highlights possible patterns to help you learn more about your skin.',
  },
  {
    icon: <FileTextIcon />,
    title: 'Get Insights',
    description: 'Receive structured insights, severity indicators, and suggestions — all for educational purposes.',
  },
];

const HowItWorks = () => (
  <S.SectionBlock id="how-it-works">
    <SectionHeaderBlock
      eyebrow="How It Works"
      title="Simple steps to"
      accent="better skin insights"
      subtitle="Our streamlined process makes it easy to explore your skin health in just minutes."
    />
    <S.Grid3>
      {STEPS.map((step) => (
        <S.InfoCard key={step.title}>
          <S.CardIcon>{step.icon}</S.CardIcon>
          <S.CardTitle>{step.title}</S.CardTitle>
          <S.CardText>{step.description}</S.CardText>
        </S.InfoCard>
      ))}
    </S.Grid3>
  </S.SectionBlock>
);

export default HowItWorks;
