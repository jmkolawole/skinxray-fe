import styled from 'styled-components';

export const Container = styled.div`
  min-height: calc(100vh - 72px); // Account for Topbar height
  background-color: #f8f9fa;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  i {
    font-size: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #212529;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`; 