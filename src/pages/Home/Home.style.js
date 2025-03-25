import styled from 'styled-components';
import {colors} from '../../ds';

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
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 48px;
  width: 100%;
  align-items: center;
  
  @media (max-width: 768px) {
    padding-top: 32px;
  }
`;

export const SymptomsWrapper = styled.div`
  display: flex;
  padding-top: 32px;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding-top: 24px;
    gap: 16px;
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  height: 236px !important;
  flex-direction: column;
  gap: 5px;
  padding: 25px;
  background-color: ${colors.shades[0]};
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adds a soft shadow */
  border-radius: 6px;

  & textarea {
    height: 136px !important;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    height: auto !important;
    
    & textarea {
      height: 120px !important;
    }
  }
`;

// Image
export const ImageContainer = styled.div`
  background-color: ${colors.shades[0]};
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: ${props => props.$showCamera ? '400px' : '220px'};
  padding: 33px;
  position: relative;
  transition: height 0.3s ease;
  
  @media (max-width: 768px) {
    height: ${props => props.$showCamera ? '350px' : '180px'};
    padding: 16px;
  }
`;

export const ImageWrapper = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: border-color 0.2s ease-in-out;
  &:hover {
    border-color: #5dc3c2;
  }
  height: calc(100% - 20px - 25px);
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const DragActive = styled.p`
  color: #5dc3c2;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Icon = styled.div`
  font-size: 40px;
  color: #5dc3c2;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const Text = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  font-weight: 400;
  color: rgb(31 41 55 / 1);
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const OrText = styled.p`
  font-size: 14px;
  color: #999;
  margin: 8px 0;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin: 6px 0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const ActionButton = styled.button`
  background-color: ${props => props.$variant === 'primary' ? '#4fd1c5' : '#2AB3B5'};
  color: white;
  padding: 8px 24px;
  border: none;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.$variant === 'primary' ? '#4ba8a8' : '#228D8F'};
  }
  
  @media (max-width: 768px) {
    padding: 6px 16px;
    height: 36px;
    font-size: 14px;
  }
`;

export const Base64Container = styled.div`
  margin-top: 20px;
  text-align: left;
`;

export const Base64Heading = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

export const Base64Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  resize: none;
  background: #f9f9f9;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  margin-top: 16px;
  color: #555;
  font-size: 16px;
`;

export const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
`;

export const HistorySection = styled.div`
  display: flex;
  gap:20px;
  align-items: flex-start; /* Ensures content aligns at the top */
  flex-direction: column;
  justify-content: start;
  padding-top: 25px;
  
  @media (max-width: 768px) {
    padding-top: 20px;
    gap: 16px;
  }
`;

export const HistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.shades[0]};
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adds a soft shadow */
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  max-height: 250px;
  overflow: hidden; /* Changed from overflow-y: auto to hidden */
  position: relative; /* Added position relative */
  
  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

export const HistoryHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.shades[0]};
  padding: 25px 25px 10px 25px;
  z-index: 2;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    padding: 16px 16px 8px 16px;
  }
`;

export const HistoryScrollArea = styled.div`
  overflow-y: auto;
  max-height: 200px;
  padding: 0 25px 25px 25px;
  
  @media (max-width: 768px) {
    max-height: 160px;
    padding: 0 16px 16px 16px;
  }
`;

export const HistoryContentInner = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HistoryItem = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  
  & :hover {
    background-color: ${colors.neutral[200]};
  }
`;

export const HistoryItemImg = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    object-fit: cover;
    border-radius: 9px;
  }
`;

export const HistoryItemContent = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;

// Medical Disclaimer Styles
export const DisclaimerContainer = styled.div`
  display: flex;
  background-color: ${colors.shades[0]};
  border: 1px solid #e5e7eb;
  border-left: 4px solid #f97316; /* Orange warning color */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 16px;
  margin: 24px 0;
  gap: 12px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    padding: 12px;
    margin: 16px 0;
    gap: 8px;
  }
`;

export const DisclaimerIcon = styled.div`
  color: #f97316; /* Orange warning color */
  font-size: 20px;
  margin-top: 2px;
`;

export const DisclaimerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const CameraContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  position: relative;
`;

export const VideoPreview = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CameraControls = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px;
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${colors.shades[0]};
`;

