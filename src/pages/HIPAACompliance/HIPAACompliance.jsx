import StaticPage from '../../components/StaticPage/StaticPage';

const SECTIONS = [
  {
    title: 'Our Commitment',
    content:
      'Skinxray AI is committed to protecting health-related information with strong technical and organizational safeguards. We design our systems with privacy and security as core requirements.',
  },
  {
    title: 'Data Protection Measures',
    content:
      'We implement industry-standard protections including:\n- Encryption of data in transit and at rest\n- Access controls and authentication safeguards\n- Secure cloud infrastructure\n- Regular monitoring and security reviews',
  },
  {
    title: 'How We Handle Health Information',
    content:
      'Images and symptom data submitted for analysis are processed to deliver AI-generated insights. We limit access to authorized systems and personnel required to operate and improve the service.',
  },
  {
    title: 'Third-Party Providers',
    content:
      'We use trusted third-party providers (such as payment processors) that maintain their own security and compliance programs. We share only the minimum data required for each service to function.',
  },
  {
    title: 'Your Rights',
    content:
      'Depending on your location and use case, you may have rights to access, correct, or delete your personal information. Contact us to submit a request.',
  },
  {
    title: 'Contact',
    content:
      'For HIPAA or privacy-related questions, contact us at skinxray@gmail.com.',
  },
];

const HIPAACompliance = () => (
  <StaticPage
    title="HIPAA Compliance"
    metaDescription="Learn how Skinxray AI protects health-related data and supports privacy and security best practices."
    lastUpdated="June 8, 2025"
    sections={SECTIONS}
  />
);

export default HIPAACompliance;
