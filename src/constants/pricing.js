const MONTHLY_PRICE = 3.99;
const YEARLY_PRICE = 39.99;

const annualAtMonthlyRate = Number((MONTHLY_PRICE * 12).toFixed(2));
const savingsAmount = Number((annualAtMonthlyRate - YEARLY_PRICE).toFixed(2));
const savingsPercent = Math.round((savingsAmount / annualAtMonthlyRate) * 100);

const formatPrice = (amount) => `$${amount.toFixed(2)}`;

export const EXPERT_CARE_PRICING = {
  monthly: {
    amount: MONTHLY_PRICE,
    display: formatPrice(MONTHLY_PRICE),
    period: 'month',
    periodLabel: '/month',
  },
  yearly: {
    amount: YEARLY_PRICE,
    display: formatPrice(YEARLY_PRICE),
    period: 'year',
    periodLabel: '/year',
    compareAt: annualAtMonthlyRate,
    compareAtDisplay: formatPrice(annualAtMonthlyRate),
    savingsPercent,
    savingsAmount,
  },
};
