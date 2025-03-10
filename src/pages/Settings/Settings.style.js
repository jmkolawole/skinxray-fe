import styled from 'styled-components';
import { Button, colors } from '../../ds';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 72px);
  overflow: hidden;
  background-color: ${colors.shades[200]};
`;

export const Content = styled.div`
  width: 672px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 16px;
    gap: 16px;
  }
`;

export const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  background-color: ${colors.shades[0]};
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  
  @media (max-width: 768px) {
    padding: 16px;
    gap: 8px;
  }
  
  .password-field-wrapper {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  
  @media (max-width: 768px) {
    text-align: center;
    gap: 12px;
  }
`;

export const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export const SectionIcon = styled.div`
  color: ${colors.primary[500]};
  font-size: 18px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${colors.primary[500]};
`;

export const FileInput = styled.input`
  display: none;
`;

export const SaveButton = styled(Button)`
  background-color: ${colors.primary[1000]};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  margin-top: 16px;
  
  &:hover {
    background-color: ${colors.primary[1100]};
  }
  
  @media (max-width: 768px) {
    margin-top: 12px;
    width: 100%;
  }
`;

export const DeleteButton = styled(Button)`
  margin-top: 8px;
  
  @media (max-width: 768px) {
    margin-top: 8px;
    width: 100%;
  }
`;
