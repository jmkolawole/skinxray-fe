import {icons as C} from './Icon.utils';
import {upperFirst} from 'lodash';
import {resolveThemeColor} from '../../utils/theme';
import {useTheme} from '../../../contexts/ThemeContext';
import PropTypes from 'prop-types';

const Icon = ({
  name,
  size = 20,
  color = 'text.primary',
  weight,
  bg = 'inherit',
  radius = 0,
  padding = 0,
  ...rest
}) => {
  const { colors: themeColors } = useTheme();
  const iconName = upperFirst(name);
  const IconComponent = C[iconName];

  const iconWeight = weight ? weight : 2;
  const defaultWeight = weight ? false : true;

  if (iconName in C) {
    return (
      <IconComponent
        $width={size}
        $height={size}
        $color={resolveThemeColor(color, { colors: themeColors })}
        $weight={iconWeight}
        $defaultWeight={defaultWeight}
        $bg={bg === 'inherit' ? 'transparent' : resolveThemeColor(bg, { colors: themeColors })}
        $radius={radius}
        $padding={padding}
        {...rest}
      />
    );
  }

  return <></>;
};

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  weight: PropTypes.number,
  color: PropTypes.string,
  bg: PropTypes.string,
  padding: PropTypes.number,
  radius: PropTypes.number,
};

export default Icon;
