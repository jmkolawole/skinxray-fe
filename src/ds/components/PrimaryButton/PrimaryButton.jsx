import PropTypes from 'prop-types';
import { PrimaryButtonStyled } from './PrimaryButton.style';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PrimaryButton = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showArrow = false,
  type = 'button',
  ...rest
}) => (
  <PrimaryButtonStyled
    type={type}
    $variant={variant}
    $size={size}
    $fullWidth={fullWidth}
    {...rest}
  >
    {children}
    {showArrow && <ArrowIcon />}
  </PrimaryButtonStyled>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'premium']),
  size: PropTypes.oneOf(['sm', 'md']),
  fullWidth: PropTypes.bool,
  showArrow: PropTypes.bool,
  type: PropTypes.string,
};

export default PrimaryButton;
