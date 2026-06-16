import styled from 'styled-components';

export const Container = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
`;

export const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ $success, theme }) =>
    $success ? theme.colors.primaryLight : theme.colors.errorLight};
  color: ${({ $success, theme }) =>
    $success ? theme.colors.primary : theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
