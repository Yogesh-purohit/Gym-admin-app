import React from 'react';
import { Box } from '../../primitives';
import { Input } from './index';

export default {
    title: 'Design System/Components/Input',
    component: Input,
    argTypes: {
        label: { control: 'text' },
        error: { control: 'text' },
        placeholder: { control: 'text' },
    },
    decorators: [
        (Story) => (
            <Box padding="l">
                <Story />
            </Box>
        ),
    ],
};

export const Basic = {
    args: {
        label: 'Username',
        placeholder: 'Enter username',
    },
};

export const WithError = {
    args: {
        label: 'Email',
        value: 'invalid-email',
        error: 'Please enter a valid email address',
    },
};
