import styled from 'styled-components';

export const Container = styled.div`
  min-height: calc(100vh - 72px);
  background-color: #f8f9fa;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: ${props => props.success ? '#e6f7f5' : '#fff3f3'};
  color: ${props => props.success ? '#00bfa5' : '#dc3545'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  justify-content: center;

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
  border: 4px solid #e9ecef;
  border-top: 4px solid #00bfa5;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`; 