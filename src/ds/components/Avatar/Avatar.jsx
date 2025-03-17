import Text from '../Text/Text';
import * as S from './Avatar.style';
import PropTypes from 'prop-types';
import { getImagesUrl } from '../../../api';

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

  const getAvatarSrc = (url) => {
    if (!url) return '';
    // Check if it's an absolute URL (like Google avatar)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Use getImagesUrl for local images
    return getImagesUrl(url);
  };

  // Get initials for text avatar
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return type === 'image' ? (
    <S.AvatarImage
      src={getAvatarSrc(value)}
      $size={size}
      $radius={radius}
      $disabled={disabled}
    />
  ) : (
    <S.AvatarContainer $size={size} $radius={radius} title={value}>
      <Text weight={500} size={textSize} color="shades.0">
        {getInitials(value)}
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
