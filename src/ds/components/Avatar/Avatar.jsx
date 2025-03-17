import {avatarText} from '../../utils/functions';
import Text from '../Text/Text';
import * as S from './Avatar.style';
import PropTypes from 'prop-types';

const Avatar = ({
  type = 'image',
  value,
  size = 40,
  radius = 100,
  disabled = false,
}) => {
  let textSize = 'md';

  if (size <= 60) {
    textSize = size > 30 ? 'sm' : 'xs';
  }

  return type === 'image' ? (
    <S.AvatarImage
      src={value}
      $size={size}
      $radius={radius}
      $disabled={disabled}
    />
  ) : (
    <S.AvatarContainer $size={size} $radius={radius} title={value}>
      <Text weight={500} size={textSize} color="shades.0">
        {avatarText(value)}
      </Text>
    </S.AvatarContainer>
  );
};

Avatar.propTypes = {
  type: PropTypes.oneOf(['image', 'text']),
  value: PropTypes.string,
  size: PropTypes.number,
  radius: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Avatar;
