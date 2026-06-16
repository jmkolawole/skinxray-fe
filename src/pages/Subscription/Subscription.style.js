import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 900px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

export const PlanName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlanPrice = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const FeaturesList = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 20px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

export const PaymentHistoryTable = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 14px;
  }

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  td {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $status, theme }) =>
    $status === 'active' || $status === 'succeeded' || $status === 'paid'
      ? 'rgba(34, 197, 94, 0.12)'
      : $status === 'grace'
        ? 'rgba(245, 158, 11, 0.12)'
        : $status === 'expired' || $status === 'failed'
          ? theme.colors.errorLight
          : theme.colors.background.tertiary};
  color: ${({ $status, theme }) =>
    $status === 'active' || $status === 'succeeded' || $status === 'paid'
      ? theme.colors.success
      : $status === 'grace'
        ? theme.colors.warning
        : $status === 'expired' || $status === 'failed'
          ? theme.colors.error
          : theme.colors.text.secondary};
`;

export const SectionSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: -16px 0 24px;
  line-height: 1.5;
`;

export const ProviderNote = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 12px 0 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  line-height: 1.5;
`;

export const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
