import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../../ds';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
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
  max-height: ${props => (props.isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding-bottom: ${props => (props.isOpen ? '16px' : '0')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const POLICY_SECTIONS = [
    {
        title: 'Introduction',
        content: `This Privacy Policy describes how Skinxray AI ("Skinxray AI", "we", "us", or "our") collects, uses, and shares your personal information when you use our application. By using Skinxray AI, you agree to the collection and use of information in accordance with this policy.`,
    },
    {
        title: '1. Information We Collect',
        content: `When you use Skinxray AI, we collect:\n- Account Information: Email address and password for account creation\n- Medical Information: Images of skin conditions and symptom descriptions you provide\n- Payment Information: When you upgrade your account, payment processing is handled securely by Stripe. We do not store your payment information directly; it is processed and stored by Stripe according to their privacy policy and security standards.`,
    },
    {
        title: '2. How We Use Your Information',
        content: `We use the information we collect to:\n- Provide AI-powered skin condition analysis\n- Process your subscription payments through Stripe\n- Improve our diagnostic algorithms and accuracy\n- Maintain and improve our application\n- Communicate with you about your account and our services`,
    },
    {
        title: '3. Data Storage and Security',
        content: `- All medical images and personal health information are encrypted\n- We use industry-standard security measures to protect your data\n- Your data is stored in secure, HIPAA-compliant servers\n- Payment information is handled securely by Stripe\n- No method of transmission over the Internet is 100% secure`,
    },
    {
        title: '4. Third-Party Services',
        content: `We use certain third-party services to operate our application:\n\n- Stripe: We use Stripe for payment processing. When you make a payment, you provide your payment information directly to Stripe. Their use of your personal information is governed by their privacy policy (https://stripe.com/privacy).\n\nWe do not sell your personal information. We may share your information:\n- With your explicit consent\n- To comply with legal obligations\n- With service providers who help operate our platform`,
    },
    {
        title: '5. Your Rights and Choices',
        content: `You have the right to:\n- Access your personal information\n- Request correction of your data\n- Request deletion of your account\n- Opt-out of marketing communications\n- Export your data\n- Withdraw consent for data processing`,
    },
    {
        title: '6. Medical Disclaimer',
        content: `Skinxray AI is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers for medical conditions.`,
    },
    {
        title: '7. Children\'s Privacy',
        content: `Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.`,
    },
    {
        title: '8. Changes to This Policy',
        content: `We may update this Privacy Policy periodically. We will notify you of any material changes through the application or via email.`,
    },
    {
        title: '9. Contact Us',
        content: `If you have questions about this Privacy Policy or our privacy practices, please contact us at:\nEmail: skinxray@gmail.com`,
    },
];

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AccordionSection>
            <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
                <Text weight={600} size="lg">{title}</Text>
                <Text size="lg">{isOpen ? '−' : '+'}</Text>
            </AccordionHeader>
            <AccordionContent isOpen={isOpen}>
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
};

const PrivacyPolicy = () => {
    // This should be updated whenever the policy is modified
    const policyDate = "March 14, 2024";

    return (
        <Container>
            <Text weight={700} type="h2" style={{ marginBottom: '16px' }}>
                Privacy Policy
            </Text>
            <PolicyDate>
                <Text color="neutral.600">
                    Last Updated: {policyDate}
                </Text>
            </PolicyDate>
            {POLICY_SECTIONS.map((section, index) => (
                <Accordion key={index} title={section.title}>
                    {section.content}
                </Accordion>
            ))}
        </Container>
    );
};

export default PrivacyPolicy; 