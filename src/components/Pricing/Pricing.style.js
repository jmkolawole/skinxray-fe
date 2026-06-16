import styled from 'styled-components';

export const PricingSection = styled.section`
  padding: 0;
`;

export const BillingToggle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 28px;
`;

export const BillingToggleInner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
`;

export const BillingToggleButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 132px;
  padding: 10px 18px;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text.secondary)};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SavingsBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
`;

export const CompareAtPrice = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.light};
  text-decoration: line-through;
`;

export const SavingsNote = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success};
`;

export const PricingCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PricingCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 24px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.2s ease, border-color 0.2s ease;
  border: 2px solid
    ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.border)};
  position: relative;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ selected, theme }) =>
    selected &&
    `
    &::before {
      content: 'Selected';
      position: absolute;
      top: 16px;
      right: 16px;
      background: ${theme.colors.primary};
      color: white;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
    }
  `}
`;

export const PriceTag = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 20px 0;
`;

export const PriceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 28px;
  text-align: left;
  width: 100%;
`;

export const PriceFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

export const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const RecommendedBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.premiumGradientEnd});
  color: white;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;
