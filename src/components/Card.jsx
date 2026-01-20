import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export const Card = ({ children, style, variant = 'elevated', noPadding = false }) => {
    const { colors, spacing, radii, shadows } = useTheme();

    const cardStyles = [
        styles.card,
        {
            backgroundColor: colors.background.secondary,
            borderRadius: radii.l,
            padding: noPadding ? 0 : spacing.l,
            borderColor: colors.border.subtle,
            borderWidth: variant === 'outlined' ? 1 : 0,
        },
        variant === 'elevated' && shadows.sm,
        style,
    ];

    return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
    },
});
