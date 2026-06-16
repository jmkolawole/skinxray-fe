import styled from 'styled-components';
import { Button } from '../../ds';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
`;

export const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SaveButton = styled(Button)`
  margin-top: 8px;
  align-self: flex-start;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const DangerZone = styled.div`
  margin-top: 8px;
`;

export const DangerCard = styled.div`
  background: ${({ theme }) => theme.colors.errorLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DangerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
