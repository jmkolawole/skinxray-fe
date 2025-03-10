import styled from 'styled-components';
import { colors } from '../../../ds';

export const BackToHomeContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  top: 20px;
  left: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0;
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
  background-color: ${colors.neutral[200]};
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
  border: 1px solid ${colors.neutral[200]};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.neutral[50]};
  }

  &:active {
    background-color: ${colors.neutral[100]};
  }
`;

export const AuthLink = styled.span`
  color: ${colors.primary[500]};
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: ${colors.primary[600]};
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
