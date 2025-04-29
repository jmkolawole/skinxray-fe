import styled from 'styled-components';
import { colors } from '../../ds';

export const Section = styled.section`
  padding: 80px 20px;
  max-width: 900px;
  margin: 0 auto;
  
  h3 {
    margin-bottom: 48px;
  }

  @media (max-width: 1024px) {
    padding: 60px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Item = styled.div`
  border: 1px solid ${colors.neutral[200]};
  border-radius: 12px;
  overflow: hidden;
  background: ${colors.shades[0]};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

export const Question = styled.button`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background: ${colors.neutral[50]};
  }
`;

export const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Answer = styled.div`
  padding: ${({isOpen}) => (isOpen ? '0 20px 20px' : '0 20px')};
  max-height: ${({isOpen}) => (isOpen ? '500px' : '0')};
  opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
  transition: all 0.3s ease;
  overflow: hidden;
`; 