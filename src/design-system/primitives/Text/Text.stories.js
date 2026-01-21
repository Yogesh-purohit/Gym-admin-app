import React from 'react';
import { Text } from './index';
import { Box } from '../Box';

export default {
    title: 'Design System/Primitives/Text',
    component: Text,
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 's', 'm', 'l', 'xl', 'xxl']
        },
        weight: {
            control: 'select',
            options: ['regular', 'medium', 'bold']
        },
        color: { control: 'text' },
    },
};

export const Default = (args) => <Text {...args}>Sample Text</Text>;

Default.args = {
    size: 'm',
    weight: 'regular',
    color: 'primary',
};

export const Variants = () => (
    <Box gap="s" padding="m">
        <Text size="xxl" weight="bold">Heading XXL</Text>
        <Text size="xl" weight="bold">Heading XL</Text>
        <Text size="l" weight="medium">Subtitle Large</Text>
        <Text size="m">Body Medium (Default)</Text>
        <Text size="s" color="secondary">Caption Small</Text>
        <Text size="xs" color="tertiary">Tiny Text</Text>
    </Box>
);
