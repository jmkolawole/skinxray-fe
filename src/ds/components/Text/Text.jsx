import {fonts} from '../..';
import {cssStyleToJsx} from '../../utils/functions';
import {resolveThemeColor} from '../../utils/theme';
import {useTheme} from '../../../contexts/ThemeContext';
import PropTypes from 'prop-types';

const Text = ({
  type = 'p',
  size = 'md',
  weight,
  color = 'text.primary',
  children,
  ...rest
}) => {
  const { theme, colors: themeColors } = useTheme();
  const TextComponent = type;

  let attrs = {};

  if (type === 'p') {
    attrs = { ...fonts.p[size] };
  } else {
    attrs = { ...fonts.heading[type] };
  }

  attrs = weight ? { ...attrs, fontWeight: weight } : attrs;
  attrs.color = resolveThemeColor(color, { colors: themeColors, mode: theme });

  return (
    <TextComponent style={{ ...cssStyleToJsx(attrs) }} {...rest}>
      {children}
    </TextComponent>
  );
};

Text.propTypes = {
  type: PropTypes.oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  weight: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node || PropTypes.string,
};

export default Text;
