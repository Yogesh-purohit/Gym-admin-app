import { Platform } from 'react-native';

export const typography = {
    fontFamily: {
        regular: Platform.select({ ios: 'System', android: 'Roboto' }),
        medium: Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
        bold: Platform.select({ ios: 'System', android: 'Roboto-Bold' }),
    },
    size: {
        xs: 12,
        s: 14,
        m: 16,
        l: 18,
        xl: 24,
        xxl: 32,
    },
    weight: {
        regular: '400',
        medium: '500',
        bold: '700',
    },
    lineHeight: {
        xs: 16,
        s: 20,
        m: 24,
        l: 28,
        xl: 32,
        xxl: 40,
    },
    variants: {
        h1: {
            fontSize: 32,
            lineHeight: 40,
            fontWeight: '700',
        },
        h2: {
            fontSize: 24,
            lineHeight: 32,
            fontWeight: '700',
        },
        h3: {
            fontSize: 18,
            lineHeight: 28,
            fontWeight: '600',
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '400',
        },
        caption: {
            fontSize: 12,
            lineHeight: 16,
            fontWeight: '400',
        },
    },
};
