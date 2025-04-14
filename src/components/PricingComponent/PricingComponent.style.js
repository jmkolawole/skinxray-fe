import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1024px) {
    gap: 2rem;
    padding: 1.5rem;
  }
`;

export const PlanCard = styled.div`
  background: ${({ isSelected }) => (isSelected ? '#f0f9ff' : '#ffffff')};
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3b82f6' : '#e5e7eb')};
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 768px) {
    width: calc(33.333% - 1.35rem);
    min-width: 300px;
  }
`;

export const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
`;

export const PlanPrice = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;

  span {
    font-size: 1.25rem;
    font-weight: 500;
    color: #6b7280;

    &:last-child {
      font-size: 1rem;
    }
  }
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #4b5563;
  font-size: 0.95rem;

  i {
    color: #10b981;
    font-size: 1rem;
  }
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${({ isSelected }) => (isSelected ? '#3b82f6' : '#ffffff')};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#3b82f6')};
  border: 2px solid #3b82f6;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ isSelected }) => (isSelected ? '#2563eb' : '#f0f9ff')};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  i {
    margin-right: 0.5rem;
  }
`; 