import React from 'react';
import { StatusBadge } from './index';

export default {
    title: 'Components/StatusBadge',
    component: StatusBadge,
    argTypes: {
        status: { control: 'text' },
        variant: {
            control: { type: 'select' },
            options: ['neutral', 'success', 'warning', 'error', 'info'],
        },
    },
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
