import PropTypes from 'prop-types';
import { TextInput } from '../../ds';
import styled from 'styled-components';

const PasswordWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

/**
 * A wrapper component for password fields to ensure they're properly contained in a form
 */
const PasswordField = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  onKeyDown,
  autoComplete,
  name,
  ...rest
}) => {
  return (
    <PasswordWrapper>
      <TextInput
        type="password"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error || []}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete}
        name={name}
        {...rest}
      />
    </PasswordWrapper>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.array,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default PasswordField; 