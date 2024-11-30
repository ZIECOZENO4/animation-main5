export type SizeDescriptor = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

export const newCalculateFontSize = (value: string | number, size: SizeDescriptor = 'md'): number => {
    const length = value.toString().length;

    const sizeFactors: Record<SizeDescriptor, number> = {
        'xxxs': 0.25,
        'xxs': 0.5,
        'xs': 0.75,
        'sm': 0.875,
        'md': 1,
        'lg': 1.125,
        'xl': 1.25,
        '2xl': 1.5,
        '3xl': 1.875,
        '4xl': 2.25,
        '5xl': 3,
        '6xl': 3.75,
        '7xl': 4.5,
        '8xl': 6,
        '9xl': 8,
    };

    const baseFontSize = 16; // Assuming a base font size of 16px
    const factor = sizeFactors[size];

    // Calculate the font size based on the length and size factor
    const calculatedSize = Math.max(10, baseFontSize * factor - length * 1.5);

    // Round to the nearest whole number
    return Math.round(calculatedSize);
};