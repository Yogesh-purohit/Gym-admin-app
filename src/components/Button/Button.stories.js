import React from 'react';
import { View } from 'react-native';
import { Button } from './index';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'outline', 'ghost'],
        },
        size: {
            control: { type: 'select' },
            options: ['s', 'm', 'l'],
        },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        onPress: { action: 'onPress' },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
};

export const Primary = {
    args: {
        title: 'Primary Button',
        variant: 'primary',
    },
};

export const Secondary = {
    args: {
        title: 'Secondary Button',
        variant: 'secondary',
    },
};

export const Outline = {
    args: {
        title: 'Outline Button',
        variant: 'outline',
    },
};

export const Ghost = {
    args: {
        title: 'Ghost Button',
        variant: 'ghost',
    },
};

export const Loading = {
    args: {
        title: 'Loading',
        loading: true,
    },
};

export const Disabled = {
    args: {
        title: 'Disabled',
        disabled: true,
    },
};
