import React from 'react';
import { Box } from '../../primitives';

export const Card = ({ children, style, variant = 'elevated', noPadding = false, ...props }) => {
    return (
        <Box
            bgColor="background.secondary"
            radius="l"
            padding={noPadding ? 0 : "l"}
            borderColor="border.subtle"
            borderWidth={variant === 'outlined' ? 1 : 0}
            overflow="hidden"
            shadowColor={variant === 'elevated' ? 'black' : 'transparent'}
            shadowOffset={variant === 'elevated' ? { width: 0, height: 1 } : { width: 0, height: 0 }}
            shadowOpacity={variant === 'elevated' ? 0.05 : 0}
            shadowRadius={variant === 'elevated' ? 2 : 0}
            elevation={variant === 'elevated' ? 2 : 0}
            style={style}
            {...props}
        >
            {children}
        </Box>
    );
};
