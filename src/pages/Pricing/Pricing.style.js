import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
  text-align: center;
`;

export const PageSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 32px;
  font-size: 15px;
`;
