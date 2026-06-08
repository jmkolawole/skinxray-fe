import StaticPage from '../../components/StaticPage/StaticPage';

const SECTIONS = [
  {
    title: 'Important Notice',
    content:
      'Skinxray AI is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.',
  },
  {
    title: 'No Doctor-Patient Relationship',
    content:
      'Use of Skinxray AI does not create a doctor-patient relationship. AI-generated outputs are automated assessments and should be interpreted as guidance, not a clinical diagnosis.',
  },
  {
    title: 'When to Seek Professional Care',
    content:
      'Always seek the advice of your physician or another qualified health provider with any questions about a medical condition. Never disregard professional medical advice or delay seeking it because of something you read or receive from Skinxray AI.',
  },
  {
    title: 'Emergency Situations',
    content:
      'If you think you may have a medical emergency, call your doctor or emergency services immediately. Skinxray AI is not designed for emergency use.',
  },
  {
    title: 'Accuracy Limitations',
    content:
      'AI analysis may be incomplete or incorrect. Results can vary based on image quality, symptom description, and individual health factors. Use results as one input among many—not as a definitive medical conclusion.',
  },
  {
    title: 'Contact',
    content:
      'Questions about this disclaimer? Contact us at skinxray@gmail.com.',
  },
];

const MedicalDisclaimer = () => (
  <StaticPage
    title="Medical Disclaimer"
    metaDescription="Read the Skinxray AI medical disclaimer regarding the informational nature of our skin health analysis."
    lastUpdated="June 8, 2025"
    sections={SECTIONS}
  />
);

export default MedicalDisclaimer;
