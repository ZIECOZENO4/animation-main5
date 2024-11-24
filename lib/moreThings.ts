// utils/phaseUtils.ts


// utils/formatters.ts
export function formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
    });
    return formatter.format(value);
}