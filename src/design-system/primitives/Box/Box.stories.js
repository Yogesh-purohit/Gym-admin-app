import React from 'react';
import { Box } from './index';
import { Text } from '../Text';

export default {
    title: 'Design System/Primitives/Box',
    component: Box,
    argTypes: {
        bgColor: { control: 'color' },
        padding: { control: 'number' },
        margin: { control: 'number' },
        radius: { control: 'number' },
    },
};

export const Default = (args) => (
    <Box {...args}>
        <Text>Box Content</Text>
    </Box>
);

Default.args = {
    bgColor: 'primary500',
    padding: 'm',
    radius: 'm',
    width: 200,
    height: 100,
    align: 'center',
    justify: 'center',
};

export const Layout = () => (
    <Box direction="row" gap="m" padding="m" bgColor="gray100">
        <Box width={50} height={50} bgColor="primary500" radius="s" />
        <Box width={50} height={50} bgColor="primary600" radius="s" />
        <Box width={50} height={50} bgColor="primary700" radius="s" />
    </Box>
);
