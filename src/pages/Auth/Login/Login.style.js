import styled from 'styled-components';

export const BackToHomeContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`;

export const BackToHomeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const SwitchAuthMode = styled.div`
  margin-top: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const SocialLoginSection = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`;

export const SocialDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    opacity: 0.92;
  }
`;

export const AuthLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

export const Footer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const WarningIcon = styled.img`
  height: 49px;
`;
