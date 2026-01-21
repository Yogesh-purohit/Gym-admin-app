import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { buildStyle } from '../../utils/styleProps';

export const Text = ({ children, style, variant = 'body', align, ...props }) => {
    const { theme } = useTheme();

    // Base text style from theme variants if available, otherwise fallback to body
    const variantStyle = theme.typography.variants?.[variant] || {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.size.m,
        lineHeight: theme.typography.lineHeight.m,
        color: theme.colors.text.primary,
    };

    const computedStyle = buildStyle(props, theme);

    // Support font family switching based on weight for Android
    const fontStyle = {};
    const finalWeight = computedStyle.fontWeight || variantStyle.fontWeight;

    if (finalWeight === '700' || finalWeight === 'bold') {
        fontStyle.fontFamily = theme.typography.fontFamily.bold;
    } else if (finalWeight === '500' || finalWeight === 'medium') {
        fontStyle.fontFamily = theme.typography.fontFamily.medium;
    }

    const alignmentStyle = align ? { textAlign: align } : {};

    return (
        <RNText style={[variantStyle, fontStyle, alignmentStyle, computedStyle, style]} {...props}>
            {children}
        </RNText>
    );
};
