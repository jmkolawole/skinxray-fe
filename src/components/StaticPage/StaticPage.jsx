import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Text, Button, Icon } from '../../ds';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const PolicyDate = styled.div`
  margin-bottom: 32px;
`;

const AccordionSection = styled.div`
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.$isOpen ? '1000px' : '0')};
  overflow: hidden;
  padding-bottom: ${(props) => (props.$isOpen ? '16px' : '0')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionSection>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <Text weight={600} size="lg">
          {title}
        </Text>
        <Text size="lg">{isOpen ? '−' : '+'}</Text>
      </AccordionHeader>
      <AccordionContent $isOpen={isOpen}>
        <Text color="neutral.700" style={{ whiteSpace: 'pre-line' }}>
          {children}
        </Text>
      </AccordionContent>
    </AccordionSection>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

const StaticPage = ({ title, metaDescription, lastUpdated, sections }) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          {title} - Skinxray AI
        </title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <Container>
        <Header>
          <BackButton variant="secondary" onClick={() => navigate('/')}>
            <Icon name="arrowLeft" size={16} />
            Back to Home
          </BackButton>
        </Header>
        <Text weight={700} type="h2" style={{ marginBottom: '16px' }}>
          {title}
        </Text>
        {lastUpdated && (
          <PolicyDate>
            <Text color="neutral.600">Last Updated: {lastUpdated}</Text>
          </PolicyDate>
        )}
        {sections.map((section, index) => (
          <Accordion
            key={section.title}
            title={section.title}
            defaultOpen={index === 0}
          >
            {section.content}
          </Accordion>
        ))}
      </Container>
    </>
  );
};

StaticPage.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StaticPage;
