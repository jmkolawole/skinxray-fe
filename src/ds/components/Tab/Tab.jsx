import Text from '../Text/Text';
import * as S from './Tab.style';
import PropTypes from 'prop-types';

const Tab = ({items, activeTab, onChange, width = 132, height = 40}) => {
  const isActive = (item) => activeTab === item;

  return (
    <S.TabContainer $width={width} $height={height}>
      {items.map((item, i) => (
        <S.TabItem
          key={i}
          $active={isActive(item)}
          onClick={() => (isActive(item) ? null : onChange(item))}
        >
          <Text
            size="sm"
            weight={isActive(item) ? 600 : 500}
            color={isActive(item) ? 'shades.0' : 'neutral.700'}
          >
            {item}
          </Text>
        </S.TabItem>
      ))}
    </S.TabContainer>
  );
};

Tab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  activeTab: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.any,
  height: PropTypes.number,
};

export default Tab;
