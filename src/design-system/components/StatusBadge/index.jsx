import React from 'react';
import { Box, Text } from '../../primitives';
import { useTheme } from '../../context/ThemeProvider';

export const StatusBadge = ({ status, variant = 'neutral', ...props }) => {
    const { colors } = useTheme();

    const getStyles = () => {
        const key = status?.toLowerCase() || variant;
        switch (key) {
            case 'active':
            case 'success':
            case 'present':
            case 'paid':
            case 'converted':
                return { bg: 'status.successBg', text: 'status.success' };
            case 'warning':
            case 'pending':
                return { bg: 'status.warningBg', text: 'status.warning' };
            case 'error':
            case 'inactive':
            case 'absent':
            case 'expired':
            case 'lost':
            case 'closed':
                return { bg: 'status.errorBg', text: 'status.error' };
            case 'info':
            case 'called':
                return { bg: 'status.infoBg', text: 'status.info' };
            default:
                return { bg: 'background.tertiary', text: 'text.secondary' };
        }
    };

    const style = getStyles();

    return (
        <Box
            bgColor={style.bg}
            paddingHorizontal="s"
            paddingVertical="xs"
            radius="full"
            alignSelf="flex-start"
            {...props}
        >
            <Text
                color={style.text}
                fontSize="xs"
                fontWeight="medium"
                textTransform="uppercase"
            >
                {status || 'Unknown'}
            </Text>
        </Box>
    );
};
