// Currency formatting utility for Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCurrencyWithDecimals = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Get currency symbol
export const getCurrencySymbol = (): string => {
  return '₹';
};

// Format price range
export const formatPriceRange = (minPrice: number, maxPrice: number): string => {
  return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
};
