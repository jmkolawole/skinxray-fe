import { colors as palette } from './colors';

export const FONT_FAMILY = "'Sora', sans-serif";

export const lightColors = {
  primary: '#2AB3B5',
  primaryDark: '#1E8A8C',
  primaryLight: 'rgba(42, 179, 181, 0.12)',
  premiumGradientEnd: '#FF6B9D',
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    light: '#94A3B8',
  },
  background: {
    main: '#F7FAFB',
    secondary: '#F7FAFB',
    tertiary: 'rgba(0, 0, 0, 0.05)',
    hero: ['#E6F7F7', '#CCF0F1'],
  },
  border: 'rgba(0, 0, 0, 0.08)',
  inputBorder: 'rgba(15, 23, 42, 0.18)',
  inputBackground: '#F7FAFB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  segmentActive: '#FFFFFF',
  segmentTrack: 'rgba(0, 0, 0, 0.05)',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  white: '#FFFFFF',
  errorLight: '#FEF2F2',
  disclaimer: '#1E8A8C',
  glassTab: 'rgba(255, 255, 255, 0.88)',
  shadow: 'rgba(0, 0, 0, 0.07)',
};

export const darkColors = {
  primary: '#2AB3B5',
  primaryDark: '#1E8A8C',
  primaryLight: 'rgba(42, 179, 181, 0.14)',
  premiumGradientEnd: '#FF6B9D',
  text: {
    primary: '#F0F4F8',
    secondary: '#8EA3B8',
    light: '#64748B',
  },
  background: {
    main: '#0A0F14',
    secondary: '#0A0F14',
    tertiary: 'rgba(255, 255, 255, 0.06)',
    hero: ['#0D2628', '#0A1A1C'],
  },
  border: 'rgba(255, 255, 255, 0.09)',
  inputBorder: 'rgba(255, 255, 255, 0.18)',
  inputBackground: 'rgba(255, 255, 255, 0.04)',
  surface: '#111827',
  card: '#111827',
  segmentActive: '#1C2A38',
  segmentTrack: 'rgba(255, 255, 255, 0.06)',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  white: '#FFFFFF',
  errorLight: '#2A1F1F',
  disclaimer: '#7DC8CA',
  glassTab: 'rgba(17, 24, 37, 0.88)',
  shadow: 'rgba(0, 0, 0, 0.35)',
};

export const RISK_STYLES = {
  low: { label: 'Low Risk', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  moderate: { label: 'Moderate', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  high: { label: 'High Risk', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
};

export const SECTION_COLORS = {
  light: {
    lightBlue: { bg: '#E8F4FF', border: '#66B3FF' },
    blue: { bg: '#E6EEFF', border: '#3366FF' },
    purple: { bg: '#F0E6FF', border: '#6633FF' },
    image: { bg: '#E8F4FF', border: '#66B3FF' },
  },
  dark: {
    lightBlue: { bg: 'rgba(102, 179, 255, 0.15)', border: '#66B3FF' },
    blue: { bg: 'rgba(51, 102, 255, 0.15)', border: '#3366FF' },
    purple: { bg: 'rgba(102, 51, 255, 0.15)', border: '#6633FF' },
    image: { bg: 'rgba(102, 179, 255, 0.15)', border: '#66B3FF' },
  },
};

export function resolveThemeColor(color, theme) {
  if (!theme?.colors) return color;
  if (color === 'inherit') return 'inherit';
  if (color === 'transparent') return 'transparent';

  const semantic = {
    'text.primary': theme.colors.text.primary,
    'text.secondary': theme.colors.text.secondary,
    'text.light': theme.colors.text.light,
    primary: theme.colors.primary,
    'primary.dark': theme.colors.primaryDark,
    white: theme.colors.white,
  };

  if (semantic[color]) return semantic[color];

  const parts = color.split('.');
  if (parts.length === 2 && palette[parts[0]]?.[parts[1]] != null) {
    return palette[parts[0]][parts[1]];
  }

  return theme.colors.text.primary;
}

export function getSectionColors(themeMode) {
  return SECTION_COLORS[themeMode === 'dark' ? 'dark' : 'light'];
}
