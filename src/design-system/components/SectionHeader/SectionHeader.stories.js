import React from 'react';
import { Box } from '../../primitives';
import { SectionHeader } from './index';

export default {
    title: 'Design System/Components/SectionHeader',
    component: SectionHeader,
    argTypes: {
        action: { control: 'text' },
        onActionPress: { action: 'pressed' },
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
        title: 'Section Title',
    },
};

export const WithAction = {
    args: {
        title: 'Recent Items',
        action: 'View All',
    },
};
