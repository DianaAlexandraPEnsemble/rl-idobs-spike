export const formatInputLabels = (value: string): string => {
    return value
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, char => char.toUpperCase());
};