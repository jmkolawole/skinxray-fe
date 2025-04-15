import {strToColor} from '../../ds';
import * as S from './Loader.style';
import PropTypes from 'prop-types';

const Loader = ({size = 22, color = 'shades.0', fullPage = false, ...rest}) => {
  const thickness = (size * 2.5) / 20;

  if (fullPage) {
    return (
      <S.FullPageLoader>
        <S.Spinner
          $size={size}
          $color={strToColor(color)}
          $thickness={thickness}
          {...rest}
        >
          <span></span>
        </S.Spinner>    
      </S.FullPageLoader>
    );
  }

  return (
    <S.Spinner
      $size={size}
      $color={strToColor(color)}
      $thickness={thickness}
      {...rest}
    >
      <span></span>
    </S.Spinner>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  fullPage: PropTypes.bool,
};

export default Loader;
