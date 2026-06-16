import styled from 'styled-components';

export const PrimaryButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: ${({ $size }) => ($size === 'sm' ? 44 : 56)}px;
  padding: 0 ${({ $size }) => ($size === 'sm' ? 20 : 28)}px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${({ $size }) => ($size === 'sm' ? 14 : 15)}px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  background: ${({ $variant, theme }) =>
    $variant === 'outline'
      ? 'transparent'
      : $variant === 'premium'
        ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.premiumGradientEnd} 100%)`
        : theme.colors.primary};
  color: ${({ $variant, theme }) =>
    $variant === 'outline' ? theme.colors.primary : theme.colors.white};
  border: ${({ $variant, theme }) =>
    $variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'};
  box-shadow: ${({ $variant, theme }) =>
    $variant === 'outline' ? 'none' : `0 8px 24px ${theme.colors.primaryLight}`};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
