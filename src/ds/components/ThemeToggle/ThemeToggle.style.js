import styled from 'styled-components';

export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;
