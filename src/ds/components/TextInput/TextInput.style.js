import styled from 'styled-components';
import {colors, sizes} from '../..';

const inputSize = (size, search) => {
  if (size === 'sm') {
    return `font-size: ${sizes.s14}; ${
      search ? 'padding: 11.5px 12px 11.5px 32px;' : 'padding: 11.5px;'
    }`;
  }
  if (size === 'md') {
    return `font-size: ${sizes.s16}; ${
      search ? 'padding: 13px 16px 13px 36px;' : 'padding: 13px 16px;'
    }`;
  }
  if (size === 'lg') {
    return `font-size: ${sizes.s18}; ${
      search ? 'padding: 15px 18px 15px 38px;' : 'padding: 15px 18px;'
    }`;
  }
};

const iconPos = (props) => {
  if (props.$hasLabel || props.$errorCount.length > 0) {
    let difference = 3;

    difference = props.$hasLabel ? difference + 32 : difference;
    difference = difference + props.$errorCount * 32;

    return `calc(100% - ${difference}px)`;
  }

  return '50%';
};

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  width: ${(props) => (props.$width === 'fit' ? 'fit-content' : '100%')};
  margin-bottom: ${(props) => (props.$removeBtSpace ? 'unset' : '20px')};
`;
export const Input = styled.input`
  border-radius: ${(props) => props.$radius}px;
  font-family: inherit;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text.primary};
  border: solid 1px
    ${(props) =>
      props.$error ? colors.destructive[700] : props.theme.colors.inputBorder};
  ${(props) => inputSize(props.$size, props.$search)}

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }

  &:focus,
  &:focus-visible {
    border: solid 1px
      ${(props) =>
        props.$error ? colors.destructive[700] : props.theme.colors.primary};
    outline: unset;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: ${(props) => iconPos(props)};
  left: 10px;
  display: flex;
  transform: ${(props) => (props.$hasLabel ? 'unset' : 'translateY(-50%)')};
`;
