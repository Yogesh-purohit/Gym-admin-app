import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export const Input = ({
    label,
    error,
    leftIcon,
    rightIcon,
    style,
    containerStyle,
    ...props
}) => {
    const { colors, spacing, radii, typography } = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={[styles.label, { color: colors.text.secondary, marginBottom: spacing.xs }]}>
                    {label}
                </Text>
            )}
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: colors.background.secondary,
                        borderColor: error ? colors.status.error : colors.border.default,
                        borderRadius: radii.m,
                        paddingHorizontal: spacing.m,
                        height: 48,
                    },
                ]}
            >
                {leftIcon && <View style={{ marginRight: spacing.s }}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: colors.text.primary,
                            fontSize: typography.size.m,
                        },
                    ]}
                    placeholderTextColor={colors.text.tertiary}
                    {...props}
                />
                {rightIcon && <View style={{ marginLeft: spacing.s }}>{rightIcon}</View>}
            </View>
            {error && (
                <Text style={[styles.error, { color: colors.status.error, marginTop: spacing.xs }]}>
                    {typeof error === 'string' ? error : error.message}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: '100%',
    },
    error: {
        fontSize: 12,
    },
});
