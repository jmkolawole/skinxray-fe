import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Text, PrimaryButton, Icon } from '../../ds';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px 80px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const AccordionSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 8px;
`;

const AccordionHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    opacity: 0.85;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.$isOpen ? '2000px' : '0')};
  overflow: hidden;
  padding-bottom: ${(props) => (props.$isOpen ? '16px' : '0')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const AccordionBody = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-line;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionSection>
      <AccordionHeader type="button" onClick={() => setIsOpen(!isOpen)}>
        <Text weight={600} size="lg">{title}</Text>
        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={20} bg="inherit" color="neutral.600" weight={0} />
      </AccordionHeader>
      <AccordionContent $isOpen={isOpen}>
        <AccordionBody>{children}</AccordionBody>
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
        <title>{title} — SkinXray</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <Container>
        <Header>
          <PrimaryButton variant="outline" size="sm" onClick={() => navigate('/')}>
            <Icon name="chevronLeft" size={16} bg="inherit" color="primary.1000" weight={0} />
            Back to Home
          </PrimaryButton>
        </Header>
        <PageTitle>{title}</PageTitle>
        {lastUpdated && (
          <Text color="neutral.600" style={{ marginBottom: 32 }}>
            Last updated: {lastUpdated}
          </Text>
        )}
        {sections.map((section, index) => (
          <Accordion key={section.title} title={section.title} defaultOpen={index === 0}>
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
