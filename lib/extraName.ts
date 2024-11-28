export function extractAlphabetsFromAddress(address: string): string {
    // Validate the input
    if (typeof address !== 'string') {
        throw new Error('Input must be a string');
    }

    // Ensure the address starts with '0x'
    const normalizedAddress = address.startsWith('0x') ? address : '0x' + address;

    // Extract all alphabetic characters after the '0x'
    const alphabets = normalizedAddress.slice(2).match(/[a-zA-Z]/g) || [];

    // Combine '0x' with up to 6 alphabetic characters (8 characters total)
    return '0x' + alphabets.slice(0, 8).join('');
}