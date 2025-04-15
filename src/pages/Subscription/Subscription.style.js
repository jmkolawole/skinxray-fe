import styled from 'styled-components';
import { colors } from '../../ds/utils/colors';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.neutral[900]};
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const Card = styled.div`
  background: ${colors.shades[0]};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.neutral[200]};
`;

export const FeaturesList = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${colors.primary[100]};
  color: ${colors.primary[600]};
`;

export const PaymentHistoryTable = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${colors.neutral[200]};
  }

  th {
    font-weight: 600;
    color: ${colors.neutral[600]};
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ status }) => 
    status === 'active' ? colors.success[100] : 
    status === 'scheduled' ? colors.warning[100] :
    colors.neutral[100]};
  color: ${({ status }) => 
    status === 'active' ? colors.success[600] :
    status === 'scheduled' ? colors.warning[600] :
    colors.neutral[600]};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`; 