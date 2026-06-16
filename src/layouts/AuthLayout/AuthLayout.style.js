import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background.hero[0]} 0%,
    ${({ theme }) => theme.colors.background.main} 55%
  );
`;

export const AuthTopBar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 16px 48px ${({ theme }) => theme.colors.shadow};
`;
