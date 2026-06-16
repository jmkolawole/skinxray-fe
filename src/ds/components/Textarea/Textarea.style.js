import styled from 'styled-components';
import {colors, sizes} from '../..';

const inputSize = (size) => {
  if (size === 'sm') return `font-size: ${sizes.s14}; padding: 12px;`;
  if (size === 'md') return `font-size: ${sizes.s16}; padding: 14px;`;
  if (size === 'lg') return `font-size: ${sizes.s18}; padding: 16px;`;
};

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${(props) => (props.$width === 'fit' ? '313px' : '100%')};
  margin-bottom: 20px;
`;

export const Textarea = styled.textarea`
  border-radius: ${(props) => props.$radius}px;
  font-family: inherit;
  resize: none;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text.primary};
  border: solid 1px
    ${(props) =>
      props.$error || props.$borderError
        ? colors.destructive[700]
        : props.theme.colors.inputBorder};
  ${(props) => inputSize(props.$size)}

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }

  &:focus,
  &:focus-visible {
    border: solid 1px
      ${(props) =>
        props.$error || props.$borderError
          ? colors.destructive[700]
          : props.theme.colors.primary};
    outline: unset;
  }
  
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;
