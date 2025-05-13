import { useState } from 'react';
import { Icon, Text } from '../../ds';
import PropTypes from 'prop-types';
import * as S from './FAQ.style';

const FAQ_DATA = [
  {
    question: "How accurate is Skinxray AI's analysis?",
    answer: "Our AI model has been trained on a vast dataset of dermatological cases and achieves high accuracy rates. However, as stated in our medical disclaimer, it should be used as an informational tool and not a replacement for professional medical diagnosis.",
    icon: "chart",
    weight: 1.2
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes, we take your privacy seriously. All images and personal information are encrypted, stored securely, and never shared with third parties. We comply with HIPAA and other relevant healthcare data protection regulations.",
    icon: "lock",
    weight: 1.8
  },
  {
    question: "How quickly can I get results?",
    answer: "Our AI provides instant analysis of your uploaded images or symptom descriptions. Detailed reports are generated within seconds, allowing you to get quick insights about your skin condition.",
    icon: "clock",
    weight: 1
  },
  {
    question: "Can I use Skinxray AI on any device?",
    answer: "Yes, Skinxray AI is accessible through any modern web browser on desktop or mobile devices. Simply ensure you have a good quality camera for taking clear photos of skin conditions.",
    icon: "device",
    weight: 1
  },
  {
    question: "What types of skin conditions can be analyzed?",
    answer: "Our AI can analyze a wide range of common skin conditions including acne, rashes, moles, and other dermatological concerns. However, for serious or persistent conditions, always consult with a healthcare professional.",
    icon: "medical",
    weight: 1.8
  }
];

const FAQAccordion = ({ question, answer, icon, isOpen, onClick, weight }) => (
  <S.Item>
    <S.Question onClick={onClick}>
      <S.QuestionContent>
        <Icon name={icon} size={20} weight={weight} color={isOpen ? "primary.1000" : "neutral.600"} />
        <Text weight={600} color={isOpen ? "primary.1000" : "neutral.800"}>
          {question}
        </Text>
      </S.QuestionContent>
      <Icon 
        name="chevronDown" 
        size={20} 
        color={isOpen ? "primary.1000" : "neutral.600"}
        style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}
      />
    </S.Question>
    <S.Answer $isOpen={isOpen}>
      <Text color="neutral.600">
        {answer}
      </Text>
    </S.Answer>
  </S.Item>
);

FAQAccordion.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  weight: PropTypes.number
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <S.Section>
      <Text weight={700} type="h3" align="center" color='shades.0'>
        Frequently Asked Questions
      </Text>
      <S.Container>
        {FAQ_DATA.map((faq, index) => (
          <FAQAccordion
            key={index}
            {...faq}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </S.Container>
    </S.Section>
  );
};

export default FAQ; 