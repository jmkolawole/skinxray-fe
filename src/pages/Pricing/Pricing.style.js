import styled from 'styled-components';

export const Container = styled.div`
  min-height: calc(100vh - 72px); // Account for Topbar height
  background-color: #f8f9fa;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 0 96px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #495057;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
    color: #212529;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`; 