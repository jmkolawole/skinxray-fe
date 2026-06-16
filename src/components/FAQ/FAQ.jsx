import { useState } from 'react';
import { Icon, Text } from '../../ds';
import PropTypes from 'prop-types';
import * as S from './FAQ.style';

const FAQ_DATA = [
  {
    question: 'How accurate are SkinXray insights?',
    answer: 'Our AI provides educational insights trained on dermatological patterns. Results may be incomplete or inaccurate — use your own judgment and do not rely on them as definitive answers.',
    icon: 'chart',
    weight: 1.2,
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes. We encrypt data in transit and at rest, follow industry security practices, and never sell your personal information. See our Privacy Policy for retention details.',
    icon: 'lock',
    weight: 1.8,
  },
  {
    question: 'How quickly can I get results?',
    answer: 'Most analyses complete in under 30 seconds after you upload a photo or describe symptoms.',
    icon: 'clock',
    weight: 1,
  },
  {
    question: 'Can I use SkinXray on any device?',
    answer: 'Yes — use our web app in any modern browser, or download the iOS and Android apps for scanning on the go.',
    icon: 'device',
    weight: 1,
  },
  {
    question: 'What can SkinXray analyze?',
    answer: 'SkinXray can help you explore common skin concerns from photos and symptom descriptions. It is for educational purposes only, not professional advice.',
    icon: 'medical',
    weight: 1.8,
  },
];

const FAQAccordion = ({ question, answer, icon, isOpen, onClick, weight }) => (
  <S.Item>
    <S.Question onClick={onClick}>
      <S.QuestionContent>
        <Icon name={icon} size={20} weight={weight} color={isOpen ? 'primary' : 'text.secondary'} />
        <Text weight={600} color={isOpen ? 'primary' : 'text.primary'}>
          {question}
        </Text>
      </S.QuestionContent>
      <Icon 
        name="chevronDown" 
        size={20} 
        color={isOpen ? 'primary' : 'text.secondary'}
        style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}
      />
    </S.Question>
    <S.Answer $isOpen={isOpen}>
      <Text color="text.secondary">
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
      <Text weight={700} type="h3" align="center">
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