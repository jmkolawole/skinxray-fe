import StaticPage from '../../components/StaticPage/StaticPage';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing or using Skinxray AI, you agree to these Terms of Service. If you do not agree, do not use the service.',
  },
  {
    title: '2. Service Description',
    content:
      'Skinxray AI provides AI-powered informational skin health analysis. The service is intended for educational and informational purposes only and does not provide medical diagnosis or treatment.',
  },
  {
    title: '3. User Responsibilities',
    content:
      'You agree to:\n- Provide accurate account information\n- Use the service only for lawful purposes\n- Not misuse, reverse engineer, or attempt to disrupt the platform\n- Seek professional medical advice for serious or persistent conditions',
  },
  {
    title: '4. Subscriptions and Payments',
    content:
      'Paid plans are billed according to the pricing shown at checkout. Payments are processed by Stripe. You may cancel or manage your subscription through your account settings, subject to applicable billing terms.',
  },
  {
    title: '5. Intellectual Property',
    content:
      'All content, branding, software, and technology on Skinxray AI are owned by or licensed to us. You may not copy, distribute, or create derivative works without our written permission.',
  },
  {
    title: '6. Limitation of Liability',
    content:
      'Skinxray AI is provided "as is" without warranties of any kind. To the fullest extent permitted by law, we are not liable for decisions made based on AI-generated outputs or for any indirect, incidental, or consequential damages.',
  },
  {
    title: '7. Changes to Terms',
    content:
      'We may update these Terms from time to time. Continued use of the service after changes are posted constitutes acceptance of the updated Terms.',
  },
  {
    title: '8. Contact',
    content: 'Questions about these Terms? Contact us at skinxray@gmail.com.',
  },
];

const TermsOfService = () => (
  <StaticPage
    title="Terms of Service"
    metaDescription="Read the Skinxray AI Terms of Service governing use of our platform and services."
    lastUpdated="June 8, 2025"
    sections={SECTIONS}
  />
);

export default TermsOfService;
