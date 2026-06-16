import styled from 'styled-components';

export const Section = styled.section`
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.card};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
  }
`;

export const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Answer = styled.div`
  padding: 0 20px 18px 56px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

export const QuestionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

export const QuestionContent = QuestionLeft;

export const IconWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
`;
