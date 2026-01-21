import React from 'react';
import { Box } from '../../primitives';
import { StatusBadge } from './index';

export default {
    title: 'Design System/Components/StatusBadge',
    component: StatusBadge,
    argTypes: {
        status: { control: 'text' },
        variant: {
            control: { type: 'select' },
            options: ['neutral', 'success', 'warning', 'error', 'info'],
        },
    },
    decorators: [
        (Story) => (
            <Box padding="l">
                <Story />
            </Box>
        ),
    ],
};

export const Active = {
    args: {
        status: 'Active',
    },
};

export const Pending = {
    args: {
        status: 'Pending',
    },
};

export const Error = {
    args: {
        status: 'Error',
    },
};

export const CustomVariant = {
    args: {
        status: 'Custom',
        variant: 'info',
    },
};
