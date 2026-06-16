import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ $radius = 16 }) => $radius}px;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
  padding: ${({ $padding = 24 }) => $padding}px;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  background: ${({ $variant, theme }) => {
    if ($variant === 'success') return 'rgba(34, 197, 94, 0.12)';
    if ($variant === 'warning') return 'rgba(245, 158, 11, 0.12)';
    if ($variant === 'error') return theme.colors.errorLight;
    if ($variant === 'premium') return theme.colors.primaryLight;
    if ($variant === 'free') return theme.colors.background.tertiary;
    return theme.colors.primaryLight;
  }};
  color: ${({ $variant, theme }) => {
    if ($variant === 'success') return theme.colors.success;
    if ($variant === 'warning') return theme.colors.warning;
    if ($variant === 'error') return theme.colors.error;
    if ($variant === 'free') return theme.colors.text.secondary;
    return theme.colors.primaryDark;
  }};
`;

export const PageSection = styled.section`
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 56px 20px;
  }
`;

export const SectionHeader = styled.div`
  text-align: ${({ $align = 'center' }) => $align};
  margin-bottom: 48px;
  max-width: ${({ $maxWidth = 640 }) => $maxWidth}px;
  margin-left: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  margin-right: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

export const SectionEyebrow = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 16px;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const DisclaimerPill = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.disclaimer};
  font-size: 13px;
  line-height: 1.5;
`;

export const DisclaimerBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.errorLight};
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  margin-top: 24px;
`;

export const DisclaimerTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 4px;
`;

export const DisclaimerText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;
