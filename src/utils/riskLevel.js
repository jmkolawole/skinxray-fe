import { RISK_STYLES } from '../ds/utils/theme';

export const getRiskFromSeverity = (severity) => {
  const n = parseInt(severity, 10);
  if (!n || Number.isNaN(n)) return null;
  if (n <= 2) return 'low';
  if (n <= 3) return 'moderate';
  return 'high';
};

export const getRiskStyle = (severity) => {
  const key = getRiskFromSeverity(severity);
  return key ? RISK_STYLES[key] : null;
};
