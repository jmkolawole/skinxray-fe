import {styled} from 'styled-components';
import {buttonSize} from './Button.utils';

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  transition: all 0.3s;
  border: unset;
  font-weight: 500;
  cursor: pointer;
  width: ${(props) => props.$width};
  border-radius: ${(props) => props.$radius}px;
  font-family: inherit;
  ${(props) => buttonSize(props.$size)};

  &:focus,
  &:focus-visible {
    border: unset;
    outline: unset;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Primary = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export const Secondary = styled(Button)`
  color: ${({ theme }) => theme.colors.primaryDark};
  background: ${({ theme }) => theme.colors.primaryLight};

  & path {
    transition: all 0.3s;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    & path {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }

  &:focus,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    & path {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary} !important;
    color: ${({ theme }) => theme.colors.text.light} !important;

    & path {
      stroke: ${({ theme }) => theme.colors.text.light};
    }
  }
`;

export const Danger = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.error};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const Success = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.success};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const Warning = styled(Button)`
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.warning};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const OutlinePrimary = styled(Button)`
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  border: solid 1px ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.4 !important;
  }
`;

export const OutlineGray = styled(Button)`
  color: ${({ theme }) => theme.colors.text.secondary};
  background: transparent;
  border: solid 1px ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-color: ${({ theme }) => theme.colors.border};
  }

  &:disabled {
    opacity: 0.5;
  }
`;
