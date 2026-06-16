import styled from 'styled-components';

export const SettingsGroup = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 4px 0;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const GroupLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.light};
  padding: 16px 20px 8px;
  margin: 0;
`;

export const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:first-of-type {
    border-top: none;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RowIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RowContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RowTitle = styled.p`
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const RowSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

export const RowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;
