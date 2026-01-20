import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme';

export const StatusBadge = ({ status, variant = 'neutral' }) => {
    const { colors, spacing, radii, typography } = useTheme();

    const getStyles = () => {
        switch (status?.toLowerCase() || variant) {
            case 'active':
            case 'success':
            case 'present':
            case 'paid':
                return { bg: colors.status.successBg, text: colors.status.success };
            case 'warning':
            case 'pending':
                return { bg: colors.status.warningBg, text: colors.status.warning };
            case 'error':
            case 'inactive':
            case 'absent':
            case 'expired':
                return { bg: colors.status.errorBg, text: colors.status.error };
            case 'info':
            case 'called':
                return { bg: colors.status.infoBg, text: colors.status.info };
            case 'converted':
                return { bg: colors.status.successBg, text: colors.status.success };
            case 'lost':
            case 'closed':
                return { bg: colors.status.errorBg, text: colors.status.error };
            default:
                return { bg: colors.background.tertiary, text: colors.text.secondary };
        }
    };

    const style = getStyles();

    return (
        <View
            style={{
                backgroundColor: style.bg,
                paddingHorizontal: spacing.s,
                paddingVertical: spacing.xs,
                borderRadius: radii.full,
                alignSelf: 'flex-start',
            }}
        >
            <Text
                style={{
                    color: style.text,
                    fontSize: typography.size.xs,
                    fontWeight: typography.weight.medium,
                    textTransform: 'uppercase',
                }}
            >
                {status || 'Unknown'}
            </Text>
        </View>
    );
};
