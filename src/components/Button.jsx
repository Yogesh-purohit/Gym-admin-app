import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'm',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon
}) => {
    const { colors, spacing, radii, typography } = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return colors.action.disabled;
        if (variant === 'primary') return colors.action.primary;
        if (variant === 'secondary') return colors.action.secondary;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return colors.text.tertiary;
        if (variant === 'primary') return colors.text.inverse;
        if (variant === 'secondary') return colors.text.primary;
        return colors.action.primary;
    };

    const getBorder = () => {
        if (variant === 'outline') return { borderWidth: 1, borderColor: colors.action.primary };
        if (variant === 'secondary') return { borderWidth: 1, borderColor: colors.border.default };
        return {};
    };

    const containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: getBackgroundColor(),
        paddingVertical: size === 's' ? spacing.xs : size === 'l' ? spacing.m : spacing.s,
        paddingHorizontal: size === 's' ? spacing.m : size === 'l' ? spacing.xl : spacing.l,
        borderRadius: radii.m,
        opacity: (disabled || loading) ? 0.7 : 1,
        ...getBorder(),
        ...style,
    };

    const labelStyle = {
        color: getTextColor(),
        fontSize: typography.size[size],
        fontWeight: typography.weight.medium,
        textAlign: 'center',
        ...textStyle,
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={containerStyle}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {icon && icon}
                    <Text style={[labelStyle, icon && { marginLeft: spacing.xs }]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};
