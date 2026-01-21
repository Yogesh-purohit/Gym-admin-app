import React from 'react';
import { Box, Text } from '../../primitives';
import { Card } from './index';

export default {
    title: 'Design System/Components/Card',
    component: Card,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['elevated', 'outlined'],
        },
        noPadding: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <Box padding="l" bgColor="background.primary" flex={1}>
                <Story />
            </Box>
        ),
    ],
};

export const Elevated = {
    args: {
        variant: 'elevated',
        children: <Text>Elevated Card Content</Text>,
    },
};

export const Outlined = {
    args: {
        variant: 'outlined',
        children: <Text>Outlined Card Content</Text>,
    },
};

export const NoPadding = {
    args: {
        noPadding: true,
        children: (
            <Box padding="m" bgColor="primary50">
                <Text color="primary700">Card with No Padding and Custom Inner Padding</Text>
            </Box>
        ),
    },
};
