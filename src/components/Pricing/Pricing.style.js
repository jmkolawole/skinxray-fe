import styled from 'styled-components';

export const PricingSection = styled.section`
  padding: 80px 120px;
  background-color: #ffffff;
  
  @media (max-width: 1024px) {
    padding: 60px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const PricingCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PricingCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? '#00bfa5' : '#e9ecef'};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    border-color: #00bfa5;
  }

  ${props => props.selected && `
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    &::before {
      content: 'Selected Plan';
      position: absolute;
      top: 12px;
      right: 12px;
      background-color: #00bfa5;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
  `}
`;

export const PriceTag = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 24px 0;
`;

export const PriceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
  text-align: left;
  width: 100%;
`;

export const PriceFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #495057;
  
  i {
    color: #00bfa5;
    margin-right: 12px;
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #e6f7f5;
  color: #00bfa5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
`; 