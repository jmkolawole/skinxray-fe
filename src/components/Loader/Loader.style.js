import styled from 'styled-components';
import {colors} from '../../ds';

export const Spinner = styled.div`
  min-width: ${(props) => props.$size}px;
  min-height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;

  & > span {
    width: ${(props) => props.$size}px;
    height: ${(props) => props.$size}px;
    border: ${(props) => props.$thickness}px solid ${colors.neutral[400]}55;
    border-bottom-color: ${(props) => props.$color};
    border-left-color: ${(props) => props.$color};
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 0.4s linear infinite;
    display: flex;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const FullPageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
