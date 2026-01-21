import React from 'react';
import { Text } from 'react-native';
import { Card } from './index';

export default {
    title: 'Components/Card',
    component: Card,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['elevated', 'outlined'],
        },
        noPadding: { control: 'boolean' },
    },
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
        children: <Text>Card with No Padding</Text>,
    },
};
