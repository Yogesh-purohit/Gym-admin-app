import React from 'react';
import { Box } from '../Box';

export const Center = ({ children, ...props }) => {
    return (
        <Box
            align="center"
            justify="center"
            {...props}
        >
            {children}
        </Box>
    );
};
