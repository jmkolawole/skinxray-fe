import {useState} from 'react';
import {Button, TextArea} from '../../ds';
import * as S from './Home.style';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';

const Description = ({onSubmit, isLoading}) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
  }

  return (
    <S.DescriptionWrapper>
      <TextArea
        placeholder="Describe your skin conditions or symptoms"
        radius={12}
        required
        size="md"
        width="full"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <Button
        radius={18}
        size="md"
        variant="primary"
        width="100%"
        disabled={isLoading || description.length === 0}
        onClick={handleSubmit}
      >
        {!isLoading ? 'Analyze Symptoms' : <Loader />}
      </Button>
    </S.DescriptionWrapper>
  );
};

export default Description;

Description.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
