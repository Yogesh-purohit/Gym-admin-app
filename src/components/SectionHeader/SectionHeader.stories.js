import React from 'react';
import { SectionHeader } from './index';

export default {
    title: 'Components/SectionHeader',
    component: SectionHeader,
    argTypes: {
        action: { control: 'text' },
        onActionPress: { action: 'pressed' },
    },
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
