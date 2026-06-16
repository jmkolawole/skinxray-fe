import { SectionHeaderBlock } from '../../../ds';
import { CpuIcon, ZapIcon, LockIcon } from '../landingIcons';
import * as S from '../landingShared.style';

const FEATURES = [
  {
    icon: <CpuIcon />,
    title: 'Advanced AI',
    description: 'Purpose-built models trained to surface educational skin insights from photos and symptom descriptions.',
  },
  {
    icon: <ZapIcon />,
    title: 'Instant Results',
    description: 'Get a structured report in under 30 seconds — on web or mobile, whenever you need it.',
  },
  {
    icon: <LockIcon />,
    title: 'Privacy First',
    description: 'Your data is handled securely. We design for privacy and never sell your personal information.',
  },
];

const FeaturesSection = () => (
  <S.SectionBlock id="features">
    <SectionHeaderBlock
      eyebrow="Features"
      title="Why choose"
      accent="SkinXray"
      subtitle="Cutting-edge AI with a clear, educational approach to help you learn more about your skin."
    />
    <S.Grid3>
      {FEATURES.map((feature) => (
        <S.InfoCard key={feature.title}>
          <S.CardIcon>{feature.icon}</S.CardIcon>
          <S.CardTitle>{feature.title}</S.CardTitle>
          <S.CardText>{feature.description}</S.CardText>
        </S.InfoCard>
      ))}
    </S.Grid3>
  </S.SectionBlock>
);

export default FeaturesSection;
