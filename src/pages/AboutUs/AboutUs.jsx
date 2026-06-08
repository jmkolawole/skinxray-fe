import StaticPage from '../../components/StaticPage/StaticPage';

const SECTIONS = [
  {
    title: 'Our Mission',
    content:
      'Skinxray AI helps people understand their skin health faster by combining advanced AI with accessible, easy-to-use tools. Our goal is to give users clear, actionable insights while encouraging timely consultation with qualified healthcare professionals.',
  },
  {
    title: 'What We Do',
    content:
      'Skinxray AI analyzes skin images and symptom descriptions to provide informational assessments and care recommendations. Users can access the platform on the web and through our mobile app for convenient, on-the-go support.',
  },
  {
    title: 'Our Approach',
    content:
      'We prioritize privacy, security, and transparency. We design our product to support informed decisions—not to replace professional medical diagnosis or treatment.',
  },
  {
    title: 'Contact Us',
    content:
      'Have questions or feedback? Reach us at skinxray@gmail.com.',
  },
];

const AboutUs = () => (
  <StaticPage
    title="About Us"
    metaDescription="Learn about Skinxray AI's mission to make skin health insights more accessible through AI-powered analysis."
    lastUpdated="June 8, 2025"
    sections={SECTIONS}
  />
);

export default AboutUs;
