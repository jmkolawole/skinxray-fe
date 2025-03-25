import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../ds';
import Text from '../../ds/components/Text/Text';
import { Primary } from '../../ds/components/Button/Button.style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${colors.shades[0]};
  text-align: center;
`;

const ErrorCode = styled.div`
  font-size: 8rem;
  font-weight: 700;
  color: ${colors.primary[1000]};
  line-height: 1;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Text type="h2" color="neutral.900" style={{ marginBottom: '1rem' }}>
        Page Not Found
      </Text>
      <Text color="neutral.600" style={{ marginBottom: '2rem', maxWidth: '500px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <Primary onClick={() => navigate('/')} style={{ padding: '0.75rem 1.5rem' }}>
        Go Back Home
      </Primary>
    </Container>
  );
};

export default NotFound; 