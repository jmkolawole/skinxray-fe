import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Hero = styled.div`
  position: relative;
  padding: 32px 24px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.hero[0]} 0%,
    ${({ theme }) => theme.colors.background.hero[1]} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primaryLight};
    top: -60px;
    right: -40px;
    pointer-events: none;
  }
`;

export const HeroEyebrow = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 8px;
`;

export const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
`;

export const HeroSubtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

export const SegmentControl = styled.div`
  display: flex;
  padding: 4px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.segmentTrack};
  border: 1px solid ${({ theme }) => theme.colors.border};
  gap: 4px;
`;

export const SegmentButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  background: ${({ $active, theme }) => ($active ? theme.colors.segmentActive : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text.secondary)};
  box-shadow: ${({ $active, theme }) => ($active ? `0 2px 8px ${theme.colors.shadow}` : 'none')};
`;

export const ScanCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardLabel = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// Image upload (DragAndDrop)
export const ImageContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
  height: ${(props) => (props.$showCamera ? '400px' : 'auto')};
  padding: 24px;
  position: relative;
  border-radius: 16px;
  transition: height 0.3s ease;
`;

export const ImageWrapper = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.inputBorder};
  padding: 32px 20px;
  border-radius: 16px;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
  background: ${({ theme }) => theme.colors.inputBackground};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DragActive = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
`;

export const UploadIconWrap = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

export const UploadText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: 500;
`;

export const OrText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.light};
  margin: 12px 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primaryLight : theme.colors.primary};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primaryDark : theme.colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 16px;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & textarea {
    min-height: 160px !important;
  }
`;

export const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HistoryCard = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }
`;

export const HistoryMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HistoryTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HistoryDate = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.light};
`;

export const RiskBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  flex-shrink: 0;
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
  background: ${({ theme }) => theme.colors.card};
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
  border-radius: 12px;
`;
