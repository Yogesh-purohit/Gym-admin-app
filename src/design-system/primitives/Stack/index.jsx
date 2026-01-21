import React from 'react';
import { Box } from '../Box';

export const Stack = ({
    children,
    direction = 'column',
    gap,
    align,
    justify,
    ...props
}) => {
    return (
        <Box
            direction={direction}
            gap={gap}
            align={align}
            justify={justify}
            {...props}
        >
            {children}
        </Box>
    );
};
